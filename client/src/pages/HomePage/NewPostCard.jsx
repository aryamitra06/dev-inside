import { Avatar, Card, CardBody, Text, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalHeader, ModalContent, ModalOverlay } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import NewPostForm from '../../components/Post/NewPostForm';
import { avatarGetter, idGetter } from '../../utils/tokenExtractor';

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
            {(idGetter() && (
            <Card variant={"outline"} mb={3}>
                <CardBody display={"flex"} alignItems={"center"} justifyContent={"center"} gap={3}>
                    <Avatar p={"3px"} bgGradient='linear(to-l, #85E7FC, #90CDF4)' src={avatarGetter()} />
                    <Card width={"100%"} height={"40px"} variant={"filled"} borderRadius={"md"} display={"flex"} justifyContent={"center"} cursor={"pointer"} onClick={onOpen}><Text ml={3} fontSize={"sm"}>Write something about coding!</Text></Card>
                </CardBody>
            </Card>
            ))}
            {NewPostModal()}
        </Fragment>
    )
}
