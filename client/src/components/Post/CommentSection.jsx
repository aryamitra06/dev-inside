import { Avatar, Box, Button, Card, IconButton, HStack, Text, Textarea, Menu, MenuButton, MenuList, MenuItem, Alert, AlertIcon, SimpleGrid } from '@chakra-ui/react'
import React, { Fragment, memo, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { avatarGetter, idGetter, tokenGetter } from "../../utils/tokenExtractor";
import { useDispatch } from 'react-redux';
import moment from 'moment'
import { addCommentAction } from '../../redux/actions/postAction';
function CommentSection({ data }) {
    const dispatch = useDispatch();
    const [showBtn, setShowBtn] = useState(false);
    const [formData, setFormData] = useState({ text: "" });
    const { text } = formData;

    console.log(data);
    const { post, isFormSubmitting } = data;
    const { _id, comments } = post;

    const displaySubmitBtn = () => {
        setShowBtn(true);
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(addCommentAction(_id, formData));
        console.log(formData);
    }


    const AllComments = () => (
        <SimpleGrid columns={1}>
            {
                comments?.map((e) => (
                    <Box pl={5} pr={5} mb={3}>
                        <Box display={"flex"} gap={3}>
                            <Avatar size={"sm"} src={e?.avatar}/>
                            <Box width={"100%"}>
                                <Card variant={"outline"} p={3}>
                                    <HStack justifyContent={"space-between"}>
                                        <Box display={"flex"} gap={2} alignItems={"center"}>
                                            <Text fontWeight={"bold"} fontSize={{ base: "sm", sm: "sm", md: "md", lg: "md", xl: "md" }}>{e?.name}</Text>
                                            <Text color={"gray.400"} fontSize={{ base: "xs" }}>&bull; {moment(e?.date).format("MMM DD YYYY")}</Text>
                                        </Box>
                                        {e?.user === idGetter() && (
                                            <Menu>
                                                <MenuButton as={IconButton} icon={<BsThreeDotsVertical />} size={"sm"}>
                                                </MenuButton>
                                                <MenuList>
                                                    <MenuItem>Delete</MenuItem>
                                                </MenuList>
                                            </Menu>
                                        )}
                                    </HStack>
                                    <Text mb={2} mt={2}>{e?.text}</Text>
                                </Card>
                            </Box>
                        </Box>
                    </Box>
                ))
            }
        </SimpleGrid>
    )
    return (
        <Fragment>
            <Text fontSize={"2xl"} fontWeight={"bold"} p={5}>Discussions ({comments?.length})</Text>
            {
                tokenGetter() ? (
                    <Box pl={5} pr={5} mb={3}>
                        <Box display={"flex"} gap={3}>
                            <Avatar size={"sm"} src={avatarGetter()} bgGradient='linear(to-l, #85E7FC, #90CDF4)' p={"3px"} />
                            <Box width={"100%"}>
                                <form onSubmit={onSubmit}>
                                    <Textarea placeholder='Add to the discussion' name='text' onChange={(e) => onChange(e)} width={"100%"} mb={2} onClick={displaySubmitBtn}></Textarea>
                                    {showBtn && <Button colorScheme={"blue"} isDisabled={text?.length === 0 || isFormSubmitting} type="submit">Submit</Button>}
                                </form>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Box pl={5} pr={5} mb={6}>
                        <Alert status='info'>
                            <AlertIcon />
                            Login/Signup to comment!
                        </Alert>
                    </Box>
                )
            }
            {AllComments()}
            <Box mb={5} />
        </Fragment>
    )
}

export default memo(CommentSection)
