import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { idGetter, tokenGetter } from "../../utils/tokenExtractor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Card,
    CardBody,
    CardHeader,
    Flex,
    Avatar,
    Box,
    Heading,
    Text,
    IconButton,
    Button,
    Image,
    Menu,
    MenuItem,
    MenuButton,
    MenuList,
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter
} from "@chakra-ui/react";
import { GoGlobe } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { faHandsClapping, faComments, faShare } from "@fortawesome/free-solid-svg-icons";
import { AiFillDelete } from "react-icons/ai";
import { addLikeAction, deletePostAction, unLikeAction } from "../../redux/actions/postAction";
import moment from "moment";
import readingTime from "reading-time/lib/reading-time";

export default function PostCard({ postData, isLikeUpdating, isDeleting }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef()
    const { _id, user, cover, title, desc, name, avatar, likes, comments, date } = postData;
    const [expandText, setExpandText] = useState(desc?.slice(0, 300));
    const [showLessBtn, setShowLessBtn] = useState(false);

    const stats = readingTime(desc || "");

    const readMoreHandler = () => {
        setExpandText(desc);
        setShowLessBtn(true);
    }

    const showLessHandler = () => {
        setExpandText(desc?.slice(0, 300));
        setShowLessBtn(false);
    }

    const fullPostNavigator = () => {
        navigate(`post/${user}/${_id}`);
    }

    const profileNavigator = () => {
        navigate(`profile/${user}`)
    }

    const likePost = () => {
        dispatch(addLikeAction(_id));
    }

    const unLikePost = () => {
        dispatch(unLikeAction(_id));
    }

    const deletePost = () => {
        dispatch(deletePostAction(_id))
    }

    const hasLoggedInUserLiked = likes?.some(user => user['user'] === idGetter());

    const DeleteDialog = () => (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
        >
            <AlertDialogOverlay backdropFilter='blur(10px)'>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose} isDisabled={isDeleting}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={deletePost} ml={3} isDisabled={isDeleting}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )

    return (
        <Fragment>
            <Card mb={3} >
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar src={avatar} onClick={profileNavigator} cursor={"pointer"} bgGradient='linear(to-l, #85E7FC, #90CDF4)' p={"3px"} />
                            <Box>
                                <Heading size='sm' onClick={profileNavigator} cursor={"pointer"}>{name}</Heading>
                                <Text fontSize={"sm"} color={"gray.400"} display={"flex"} alignItems={"center"}><GoGlobe /> &nbsp;&bull; {moment(date).format("MMM DD YYYY")} &bull; {stats?.text}</Text>
                            </Box>
                        </Flex>
                        {
                            (user === idGetter()) && (
                                <Menu>
                                    <MenuButton as={IconButton} icon={<BsThreeDotsVertical />} size={"sm"}>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={onOpen} icon={<AiFillDelete />}>Delete</MenuItem>
                                    </MenuList>
                                </Menu>
                            )
                        }
                    </Flex>
                </CardHeader>
                <CardBody onClick={fullPostNavigator} cursor={"pointer"}>
                    <Text fontSize={"2xl"} fontWeight={"bold"} mb={3}>{title}</Text>
                    <Text>
                        {expandText}{expandText?.length === 300 && <>...</>}
                    </Text>
                </CardBody>
                <Text display={"flex"} justifyContent={"flex-end"} p={5}>
                    {expandText?.length === 300 && <Button size={"sm"} onClick={readMoreHandler}>Read More</Button>}
                    {showLessBtn && <Button size={"sm"} onClick={showLessHandler}>Show Less</Button>}
                </Text>
                {
                    cover && (
                        <Image
                            onClick={fullPostNavigator}
                            cursor={"pointer"}
                            objectFit='cover'
                            src={cover}
                            alt={cover}
                        />
                    )
                }
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-around"} gap={2} p={2}>
                    {
                        hasLoggedInUserLiked ? (
                            <Button onClick={unLikePost} isDisabled={isLikeUpdating || !tokenGetter()} size={{ base: "sm", sm: "sm", md: "md", lg: "md", xl: "md" }} variant="solid" colorScheme={"blue"} fontWeight={"bold"} leftIcon={<FontAwesomeIcon icon={faHandsClapping} />} width={"100%"}>
                                Clap ({likes?.length})
                            </Button>
                        ) : (
                            <Button onClick={likePost} isDisabled={isLikeUpdating || !tokenGetter()} size={{ base: "sm", sm: "sm", md: "md", lg: "md", xl: "md" }} variant="outline" leftIcon={<FontAwesomeIcon icon={faHandsClapping} />} width={"100%"}>
                                Clap ({likes?.length})
                            </Button>
                        )
                    }
                    <Button onClick={fullPostNavigator} variant='outline' size={{ base: "sm", sm: "sm", md: "md", lg: "md", xl: "md" }} leftIcon={<FontAwesomeIcon icon={faComments} />} width={"100%"}>
                        Discuss ({comments?.length})
                    </Button>
                    <Button variant='outline' size={{ base: "sm", sm: "sm", md: "md", lg: "md", xl: "md" }} leftIcon={<FontAwesomeIcon icon={faShare} />} width={"100%"}>
                        Share
                    </Button>
                </Box>
            </Card>
            {DeleteDialog()}
        </Fragment>
    )
}
