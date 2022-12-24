import {
    Avatar,
    Card,
    CardBody,
    Text,
    useDisclosure,
    Modal,
    ModalBody,
    ModalHeader,
    ModalContent,
    ModalOverlay,
    SimpleGrid,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Textarea,
    Button,
    HStack,
    ModalCloseButton,
    Skeleton
} from '@chakra-ui/react';
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { newPostAction } from "../../redux/actions/postAction";
import { avatarGetter, idGetter } from '../../utils/tokenExtractor';

export default function NewPostCard() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const resetPost = React.useRef();
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        cover: ""
    });
    const {
        title,
        desc,
        cover
    } = formData;

    const resetPostHandler = () => {
        resetPost.current.value = "";
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(newPostAction(formData, onClose, resetPostHandler));
    }

    const postReducer = useSelector((state) => state.postReducer);
    const { isFormSubmitting, postsLoading } = postReducer;


    const NewPostModal = () => (
        <Modal closeOnOverlayClick={!isFormSubmitting} isOpen={isOpen} onClose={onClose} isCentered size={{ base: "full", sm: "xl", md: "xl", lg: "xl", xl: "xl" }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Post</ModalHeader>
                <ModalCloseButton isDisabled={isFormSubmitting} />
                <ModalBody mb={3}>
                    <Fragment>
                        <form onSubmit={onSubmit}>
                            <SimpleGrid columns={1} spacing={5}>
                                <FormControl>
                                    <FormLabel>Cover image URL</FormLabel>
                                    <Input ref={resetPost} type="url" name="cover" value={cover} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                                    <FormHelperText>Could be the image url for your post's cover</FormHelperText>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Title</FormLabel>
                                    <Input ref={resetPost} type="text" name="title" maxLength={100} value={title} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                                    <FormHelperText>Could be the title of your post (100 characters maximum)</FormHelperText>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea ref={resetPost} type="text" name="desc" height={200} value={desc} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                                    <FormHelperText>Could be the description of your post</FormHelperText>
                                </FormControl>
                            </SimpleGrid>
                            <HStack mt={3} justifyContent={"flex-end"}>
                                <Button colorScheme={"blue"} type="submit" isDisabled={isFormSubmitting}>Publish</Button>
                            </HStack>
                        </form>
                    </Fragment>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
    return (
        <Fragment>
            {(idGetter() && (
                <>
                    {
                        postsLoading ? (<Skeleton height={"80px"} mb={3} />) : (
                            <Card variant={"outline"} mb={3}>
                                <CardBody display={"flex"} alignItems={"center"} justifyContent={"center"} gap={3}>
                                    <Avatar p={"3px"} bgGradient='linear(to-l, #85E7FC, #90CDF4)' src={avatarGetter()} />
                                    <Card width={"100%"} height={"40px"} variant={"filled"} borderRadius={"md"} display={"flex"} justifyContent={"center"} cursor={"pointer"} onClick={onOpen}><Text ml={3} fontSize={"sm"}>Write something about coding!</Text></Card>
                                </CardBody>
                            </Card>
                        )
                    }
                </>
            ))}
            {NewPostModal()}
        </Fragment>
    )
}
