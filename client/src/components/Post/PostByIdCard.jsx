import React, { Fragment, memo } from 'react'
import moment from 'moment'
import readingTime from "reading-time/lib/reading-time";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Card, CardBody, Image, Text, Button, Flex, Avatar, Box, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem, Stack, Skeleton, Alert, AlertIcon, ScaleFade } from '@chakra-ui/react'
import { GoGlobe } from "react-icons/go";
import CommentSection from './CommentSection';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandsClapping, faComments, faShare } from '@fortawesome/free-solid-svg-icons'
import { idGetter } from '../../utils/tokenExtractor';

const PostByIdCard = ({ data }) => {
    const { response, loading, error } = data;
    const stats = readingTime(response?.desc || "");
    return (
        <Fragment>
            {
                loading ? (
                    <Stack>
                        <Skeleton height={"300px"} />
                        <Skeleton height={"70px"} />
                    </Stack>
                ) : (
                    <>
                        {
                            error ? (
                                <Alert status='error'>
                                    <AlertIcon />
                                    {error?.msg}
                                </Alert>
                            ) : (
                                <Fragment>
                                    <ScaleFade initialScale={0.9} in>
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
                                                        <Link to={`/profile/${response?.user}`}><Avatar src={response?.avatar} bgGradient='linear(to-l, #85E7FC, #90CDF4)' p={"3px"} /></Link>
                                                        <Box>
                                                            <Link to={`/profile/${response?.user}`}><Heading size='sm' cursor={"pointer"}>{response?.name}</Heading></Link>
                                                            <Text fontSize={"sm"} color={"gray.300"} display={"flex"} alignItems={"center"}><GoGlobe /> &nbsp;&bull; {moment(response?.date).format("MMM DD YYYY")} &bull; {stats.text}</Text>
                                                        </Box>
                                                    </Flex>
                                                    {
                                                        idGetter() === response?.user && (
                                                            <Menu>
                                                                <MenuButton as={IconButton} icon={<BsThreeDotsVertical />}>
                                                                </MenuButton>
                                                                <MenuList>
                                                                    <MenuItem>Delete</MenuItem>
                                                                </MenuList>
                                                            </Menu>
                                                        )
                                                    }
                                                </Flex>
                                                <Text mt={4} mb={3} fontSize={{ base: "xl", sm: "xl", md: "2xl", lg: "3xl", xl: "3xl" }} fontWeight={"bold"}>{response?.title}</Text>
                                                <Text>{response?.desc}</Text>
                                            </CardBody>
                                            <Box display={"flex"} alignItems={"center"} justifyContent={"space-around"} gap={2} p={2}>
                                                <Button variant="solid" leftIcon={<FontAwesomeIcon icon={faHandsClapping} />} width={"100%"}>
                                                    Clap
                                                </Button>
                                                <Button variant='ghost' leftIcon={<FontAwesomeIcon icon={faComments} />} width={"100%"}>
                                                    Discuss
                                                </Button>
                                                <Button variant='ghost' leftIcon={<FontAwesomeIcon icon={faShare} />} width={"100%"}>
                                                    Share
                                                </Button>
                                            </Box>
                                        </Card>
                                    <CommentSection />
                                    </ScaleFade>
                                </Fragment>
                            )
                        }
                    </>
                )
            }
        </Fragment>
    )
}

export default memo(PostByIdCard);