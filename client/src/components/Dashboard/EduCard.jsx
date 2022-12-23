import React, { Fragment } from 'react'
import { Card, CardBody, Box, Text, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { BsThreeDotsVertical } from "react-icons/bs";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { MdSchool } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { deleteEduAction } from '../../redux/actions/profileAction';

export default function EduCard({ data }) {
    const dispatch = useDispatch();
    const profileReducer = useSelector((state) => state.profileReducer);
    const { isDeleting } = profileReducer;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const deleteEduHandler = async () => {
        await dispatch(deleteEduAction(data?._id));
        await onclose();
    }

    const ActionMenu = () => (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<BsThreeDotsVertical />}
                size={"sm"}
            />
            <MenuList>
                <MenuItem icon={<AiFillDelete />} onClick={onOpen}>
                    Delete
                </MenuItem>
            </MenuList>
        </Menu>
    )

    const ConfirmationDialog = () => (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
        >
            <AlertDialogOverlay backdropFilter='blur(10px)' closeOnOverlayClick={false}>
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
                        <Button colorScheme='red' onClick={deleteEduHandler} ml={3} isDisabled={isDeleting}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )

    return (
        <Fragment>
            <Card>
                <CardBody>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                            <MdSchool size={"55px"} color={"#B2B2B2"} />
                            <Box>
                                <Text fontWeight={"bold"} fontSize={"md"}>{data?.school}</Text>
                                <Text fontSize={"sm"} color={"gray.400"}>{data?.fieldofstudy}</Text>
                                <Text fontSize={"sm"} color={"gray.500"}>{data?.degree} &bull; {moment(data?.from).format('MMMM Do YYYY')} - {data?.current === false ? moment(data?.to).format('MMMM Do YYYY') : <>Current</>}</Text>
                            </Box>
                        </Box>
                        <Box alignSelf={"flex-start"}>
                            {ActionMenu()}
                        </Box>
                    </Box>
                    <Text fontSize={"sm"} mt={2}>{data?.description}</Text>
                </CardBody>
            </Card>
            {ConfirmationDialog()}
        </Fragment>
    )
}
