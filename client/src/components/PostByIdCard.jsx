import React, { Fragment } from 'react'
import moment from 'moment'
import readingTime from "reading-time/lib/reading-time";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Card, CardBody, Image, Text, Button, Flex, Avatar, Box, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import CommentSection from './CommentSection';

export default function PostByIdCard({ data }) {
    const { response, loading, error } = data;
    console.log(response);
    const stats = readingTime(response?.desc || "");
    return (
        <Fragment>
            <Card overflow={"hidden"}>
                {
                    response?.cover && (
                        <Image
                            src={response?.cover}
                            objectFit='cover'
                        />
                    )
                }
                <CardBody>
                    <Flex spacing='4' mt={4}>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar />
                            <Box>
                                <Heading size='sm' cursor={"pointer"}>{response?.name}</Heading>
                                <Text fontSize={"sm"} color={"gray.500"}>{moment(response?.date).format("MMM DD YYYY")} &bull; {stats.text}</Text>
                            </Box>
                        </Flex>
                        <Menu>
                            <MenuButton as={IconButton} icon={<BsThreeDotsVertical />}>
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Delete</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                    <Text mt={4} mb={3} fontSize={{ base: "xl", sm: "xl", md: "2xl", lg: "3xl", xl: "3xl" }} fontWeight={"bold"}>{response?.title}</Text>
                    <Text>{response?.desc}</Text>
                </CardBody>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-around"} gap={2} p={2}>
                    <Button variant='ghost' leftIcon={<BiLike />} width={"100%"}>
                        Like
                    </Button>
                    <Button variant='ghost' leftIcon={<BiChat />} width={"100%"}>
                        Comment
                    </Button>
                    <Button variant='ghost' leftIcon={<BiShare />} width={"100%"}>
                        Share
                    </Button>
                </Box>
            </Card>
            <CommentSection />
        </Fragment>
    )
}
