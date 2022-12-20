import React, { Fragment, memo } from 'react'
import moment from 'moment'
import readingTime from "reading-time/lib/reading-time";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Card, CardBody, Image, Text, Button, Flex, Avatar, Box, Heading, IconButton, Menu, MenuButton, MenuList, MenuItem, Stack, Skeleton, Alert, AlertIcon } from '@chakra-ui/react'
import { GoGlobe } from "react-icons/go";
import CommentSection from './CommentSection';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandsClapping, faComments, faShare } from '@fortawesome/free-solid-svg-icons'
import { idGetter } from '../../utils/tokenExtractor';
import { addLikeAction, deletePostAction, unLikeAction } from '../../redux/actions/postAction';
import { useDispatch } from 'react-redux';

const PostByIdCard = ({ postReducer }) => {
    const dispatch = useDispatch();

    const { post, postLoading, error, isLikeUpdating } = postReducer;
    const { _id, name, avatar, likes, title, desc, cover, user, date } = post;

    const stats = readingTime(desc || "");
    let isLoggedInUser = likes?.some(user => user['user'] === idGetter());

    const likePost = () => {
        dispatch(addLikeAction(_id));
    }

    const unLikePost = () => {
        dispatch(unLikeAction(_id));
    }

    // const deletePost = () => {
    //     dispatch(deletePostAction(_id));
    // }

    return (
        <Fragment>
            {
                postLoading ? (
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

                                    <Card overflow={"hidden"}>
                                        {
                                            cover && (
                                                <Image
                                                    src={cover}
                                                    objectFit='cover'
                                                />
                                            )
                                        }
                                        <CardBody>
                                            <Flex spacing='4' mt={4}>
                                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                    <Link to={`/profile/${user}`}><Avatar src={avatar} bgGradient='linear(to-l, #85E7FC, #90CDF4)' p={"3px"} /></Link>
                                                    <Box>
                                                        <Link to={`/profile/${user}`}><Heading size='sm' cursor={"pointer"}>{name}</Heading></Link>
                                                        <Text fontSize={"sm"} color={"gray.300"} display={"flex"} alignItems={"center"}><GoGlobe /> &nbsp;&bull; {moment(date).format("MMM DD YYYY")} &bull; {stats.text}</Text>
                                                    </Box>
                                                </Flex>
                                                {
                                                    idGetter() === user && (
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
                                            <Text mt={4} mb={3} fontSize={{ base: "xl", sm: "xl", md: "2xl", lg: "3xl", xl: "3xl" }} fontWeight={"bold"}>{title}</Text>
                                            <Text>{desc}</Text>
                                        </CardBody>
                                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-around"} gap={2} p={2}>
                                            {
                                                isLoggedInUser ? (
                                                    <Button onClick={unLikePost} isDisabled={isLikeUpdating} size={{ base: "sm", sm: "sm", md: "md", lg: "md", xl: "md" }} variant="solid" colorScheme={"blue"} fontWeight={"bold"} leftIcon={<FontAwesomeIcon icon={faHandsClapping} />} width={"100%"}>
                                                        Clap ({likes?.length})
                                                    </Button>
                                                ) : (
                                                    <Button onClick={likePost} isDisabled={isLikeUpdating} size={{ base: "sm", sm: "sm", md: "md", lg: "md", xl: "md" }} variant="outline" leftIcon={<FontAwesomeIcon icon={faHandsClapping} />} width={"100%"}>
                                                        Clap ({likes?.length})
                                                    </Button>
                                                )
                                            }
                                            <Button variant='outline' leftIcon={<FontAwesomeIcon icon={faComments} />} width={"100%"}>
                                                Discuss
                                            </Button>
                                            <Button variant='outline' leftIcon={<FontAwesomeIcon icon={faShare} />} width={"100%"}>
                                                Share
                                            </Button>
                                        </Box>
                                    </Card>
                                    <CommentSection postReducer = {postReducer} />
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