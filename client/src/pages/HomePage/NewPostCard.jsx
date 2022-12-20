import { Avatar, Card, CardBody, Text, useColorModeValue, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalHeader, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import NewPostForm from '../../components/Post/NewPostForm';
import { avatarGetter } from '../../utils/tokenExtractor'

export default function NewPostCard() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const NewPostModal = () => (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: "full", sm: "xl", md: "xl", lg: "xl", xl: "xl" }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody mb={3}>
                    <NewPostForm onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
    return (
        <Fragment>
            <Card variant={"outline"} mb={3}>
                <CardBody display={"flex"} alignItems={"center"} justifyContent={"center"} gap={3}>
                    <Avatar src={avatarGetter()} />
                    <Card width={"100%"} height={"40px"} variant={"filled"} borderRadius={"md"} display={"flex"} justifyContent={"center"} cursor={"pointer"} onClick={onOpen}><Text ml={3} fontSize={"sm"} color={useColorModeValue("gray.500", "gray.400")}>Write something about coding!</Text></Card>
                </CardBody>
            </Card>
            {NewPostModal()}
        </Fragment>
    )
}
