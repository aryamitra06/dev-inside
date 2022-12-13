import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Flex, Avatar, Box, Heading, Text, IconButton, Button } from '@chakra-ui/react'
import moment from "moment";
import readingTime from "reading-time/lib/reading-time";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function PostCard({ data }) {
    const navigate = useNavigate();
    const [expandText, setExpandText] = useState(data?.text?.slice(0, 300));
    const [showLessBtn, setShowLessBtn] = useState(false);

    const stats = readingTime(data?.text);

    const readMoreHandler = () => {
        setExpandText(data?.text);
        setShowLessBtn(true);
    }

    const showLessHandler = () => {
        setExpandText(data?.text?.slice(0, 300));
        setShowLessBtn(false);
    }

    const fullPostNavigator = () => {
        navigate(`post/${data?._id}`);
    }

    const profileNavigator = () => {
        navigate(`profile/${data?.user}`)
    }


    return (
        <Card mb={3} >
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={data?.name} src={data?.avatar} onClick={profileNavigator} cursor={"pointer"}/>
                        <Box>
                            <Heading size='sm' onClick={profileNavigator} cursor={"pointer"}>{data?.name}</Heading>
                            <Text>{moment(data?.date).format("MMM DD YYYY")} &bull; {stats?.text}</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<BsThreeDotsVertical />}
                    />
                </Flex>
            </CardHeader>
            <CardBody onClick={fullPostNavigator} cursor={"pointer"}>
                <Text>
                    {expandText}{expandText?.length === 300 && <>...</>}
                </Text>
            </CardBody>
            <Text display={"flex"} justifyContent={"flex-end"} p={5}>
                {expandText?.length === 300 && <Button size={"sm"} onClick={readMoreHandler}>Read More</Button>}
                {showLessBtn && <Button size={"sm"} onClick={showLessHandler}>Show Less</Button>}
            </Text>
            {/* <Image
                objectFit='cover'
                src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Chakra UI'
            /> */}

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
    )
}
