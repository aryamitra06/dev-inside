import React, { Fragment } from 'react'
import moment from 'moment'
import { BsThreeDotsVertical } from "react-icons/bs";
import { Card, CardBody, Image, Text, Button, Flex, Avatar, Box, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import CommentSection from './CommentSection';

export default function PostByIdCard() {
    return (
        <Fragment>
            <Card overflow={"hidden"}>
                <Image
                    src='https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    objectFit='cover'
                />
                <CardBody>
                    <Flex spacing='4' mt={4}>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar/>
                            <Box>
                                <Heading size='sm' cursor={"pointer"}>Aryamitra Chaudhuri</Heading>
                                <Text fontSize={"sm"} color={"gray.500"}>{moment("data?.date").format("MMM DD YYYY")} &bull; {"stats?.text"}</Text>
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
                    <Text mt={4} mb={3} fontSize={{ base: "xl", sm: "xl", md: "2xl", lg: "3xl", xl: "3xl" }} fontWeight={"bold"}>React v18.0 - A Game Changer</Text>
                    <Text>The most important addition in React 18 is something we hope you never have to think about: concurrency.
                        We think this is largely true for application developers, though the story may be a bit more complicated for library maintainers.
                        Concurrency is not a feature, per se. It is a new behind-the-scenes mechanism that enables React to prepare multiple versions of your UI at the same time.
                        You can think of concurrency as an implementation detail — it is valuable because of the features that it unlocks.
                        React uses sophisticated techniques in its internal implementation, like priority queues and multiple buffering.
                        But you wont see those concepts anywhere in our public APIs. When we design APIs, we try to hide implementation details from developers.
                        As a React developer, you focus on what you want the user experience to look like, and React handles how to deliver that experience.
                        So we dont expect React developers to know how concurrency works under the hood.
                    </Text>
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
