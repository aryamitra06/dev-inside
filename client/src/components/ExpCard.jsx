import React from 'react'
import { Card, CardBody, Box,Text,IconButton } from '@chakra-ui/react'
import { MdWork } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
export default function ExpCard() {
    return (
        <Card>
            <CardBody>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"} gap={2}>
                        <MdWork size={"55px"} color={"#B2B2B2"} />
                        <Box>
                            <Text fontWeight={"bold"} fontSize={"md"}>Company Name</Text>
                            <Text fontSize={"xs"} color={"gray.400"}>Full Stack Developer &bull; 2/1/2013 - 3/1/2019</Text>
                            <Text fontSize={"xs"} color={"gray.400"}>Kolkata, India</Text>
                        </Box>
                    </Box>
                    <Box>
                        <IconButton color={"red.400"} variant={"ghost"}><AiFillDelete /></IconButton>
                    </Box>
                </Box>
                <Text fontSize={"sm"} mt={2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, et laboriosam eveniet laudantium,
                    debitis ullam repellat.</Text>
            </CardBody>
        </Card>
    )
}
