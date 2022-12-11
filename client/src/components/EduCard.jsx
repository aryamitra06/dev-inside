import React from 'react'
import { Card, CardBody, Box, Text, IconButton } from '@chakra-ui/react'
import moment from "moment";
import { MdSchool } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';

export default function EduCard({data}) {
    return (
        <Card>
            <CardBody>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"} gap={2}>
                        <MdSchool size={"55px"} color={"#B2B2B2"} />
                        <Box>
                            <Text fontWeight={"bold"} fontSize={"md"}>{data?.school}</Text>
                            <Text fontSize={"xs"} color={"gray.400"} fontWeight={"bold"}>{data?.fieldofstudy}</Text>
                            <Text fontSize={"xs"} color={"gray.400"}>{data?.degree} &bull; {moment(data?.from).format('MMMM Do YYYY')} - {data?.current === false ? moment(data?.to).format('MMMM Do YYYY') : <>Current</>}</Text>
                        </Box>
                    </Box>
                    <Box>
                        <IconButton color={"red.400"} variant={"ghost"}><AiFillDelete /></IconButton>
                    </Box>
                </Box>
                <Text fontSize={"sm"} mt={2}>{data?.description}</Text>
            </CardBody>
        </Card>
    )
}
