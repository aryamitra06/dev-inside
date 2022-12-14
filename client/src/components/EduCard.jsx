import React, {useEffect} from 'react'
import { Card, CardBody, Box, Text, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { HamburgerIcon } from "@chakra-ui/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { MdSchool } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { toggleAction } from "../redux/actions/utilsAction";
import { deleteEduAction } from '../redux/actions/profileAction';

export default function EduCard({ data }) {
    const dispatch = useDispatch();
    const deleteRes = useSelector((state) => state.deleteedu);
    const deleteEduHandler = () => {
        dispatch(deleteEduAction(data?._id));
    }

    useEffect(() => {
        if (deleteRes.success === true) {
            dispatch(toggleAction(prev => !prev));
        }
    }, [deleteRes.success, dispatch])

    const ActionMenu = () => (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='ghost'
            />
            <MenuList>
                <MenuItem icon={<AiFillDelete />} onClick={deleteEduHandler} isDisabled={deleteRes.loading === true}>
                    Delete
                </MenuItem>
            </MenuList>
        </Menu>
    )

    return (
        <Card>
            <CardBody>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"} gap={2}>
                        <MdSchool size={"55px"} color={"#B2B2B2"} />
                        <Box>
                            <Text fontWeight={"bold"} fontSize={"md"}>{data?.school}</Text>
                            <Text fontSize={"sm"} color={"gray.400"} fontWeight={"bold"}>{data?.fieldofstudy}</Text>
                            <Text fontSize={"sm"} color={"gray.400"}>{data?.degree} &bull; {moment(data?.from).format('MMMM Do YYYY')} - {data?.current === false ? moment(data?.to).format('MMMM Do YYYY') : <>Current</>}</Text>
                        </Box>
                    </Box>
                    <Box>
                        {ActionMenu()}
                    </Box>
                </Box>
                <Text fontSize={"sm"} mt={2}>{data?.description}</Text>
            </CardBody>
        </Card>
    )
}
