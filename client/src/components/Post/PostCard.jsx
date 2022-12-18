import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Flex, Avatar, Box, Heading, Text, IconButton, Button, Image, Menu, MenuItem, MenuButton, MenuList, ScaleFade } from '@chakra-ui/react'
import moment from "moment";
import readingTime from "reading-time/lib/reading-time";
import { GoGlobe } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandsClapping, faComments, faShare } from '@fortawesome/free-solid-svg-icons'
import { AiFillDelete } from 'react-icons/ai';
import {idGetter} from "../../utils/tokenExtractor";

export default function PostCard({ data }) {
    const navigate = useNavigate();
    const [expandText, setExpandText] = useState(data?.desc?.slice(0, 300));
    const [showLessBtn, setShowLessBtn] = useState(false);

    const stats = readingTime(data?.desc || "");

    const readMoreHandler = () => {
        setExpandText(data?.desc);
        setShowLessBtn(true);
    }

    const showLessHandler = () => {
        setExpandText(data?.desc?.slice(0, 300));
        setShowLessBtn(false);
    }

    const fullPostNavigator = () => {
        navigate(`post/${data?.user}/${data?._id}`);
    }

    const profileNavigator = () => {
        navigate(`profile/${data?.user}`)
    }

    return (
        <Card mb={3} >
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={data?.name} src={data?.avatar} onClick={profileNavigator} cursor={"pointer"} bgGradient='linear(to-l, #85E7FC, #90CDF4)' p={"3px"} />
                        <Box>
                            <Heading size='sm' onClick={profileNavigator} cursor={"pointer"}>{data?.name}</Heading>
                            <Text fontSize={"sm"} color={"gray.300"} display={"flex"} alignItems={"center"}><GoGlobe /> &nbsp;&bull; {moment(data?.date).format("MMM DD YYYY")} &bull; {stats?.text}</Text>
                        </Box>
                    </Flex>
                    {
                        data?.user === idGetter() && (
                            <Menu>
                                <MenuButton as={IconButton} icon={<BsThreeDotsVertical />} size={"sm"}>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem icon={<AiFillDelete/>}>Delete</MenuItem>
                                </MenuList>
                            </Menu>
                        )
                    }
                </Flex>
            </CardHeader>
            <CardBody onClick={fullPostNavigator} cursor={"pointer"}>
                <Text fontSize={"2xl"} fontWeight={"bold"} mb={3}>{data?.title}</Text>
                <Text>
                    {expandText}{expandText?.length === 300 && <>...</>}
                </Text>
            </CardBody>
            <Text display={"flex"} justifyContent={"flex-end"} p={5}>
                {expandText?.length === 300 && <Button size={"sm"} onClick={readMoreHandler}>Read More</Button>}
                {showLessBtn && <Button size={"sm"} onClick={showLessHandler}>Show Less</Button>}
            </Text>
            {
                data?.cover && (
                    <Image
                        onClick={fullPostNavigator}
                        cursor={"pointer"}
                        objectFit='cover'
                        src={data?.cover}
                        alt='Chakra UI'
                    />
                )
            }
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
    )
}
