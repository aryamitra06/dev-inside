import { Container, Text, Alert, AlertIcon, AlertTitle, Button, Center, Box, Card, CardBody, CardFooter, Avatar, VStack, HStack } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import moment from "moment";
import { AddIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import React, { Fragment, useEffect } from 'react'
import greetingTime from "greeting-time";
import { myProfileAction } from '../redux/actions/profileAction';

export default function Dashboard() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(myProfileAction());
    }, [dispatch])

    const profile = useSelector((state) => state.getprofile);
    const { avatar, date, name } = useSelector((state) => state.user.response);

    console.log(profile.response);

    const ProfileSummaryCard = () => (
        <Card align='center' mt={3}>
            <CardBody>
                <Center>
                    <VStack>
                        <Avatar src={avatar} size={{ base: "lg", sm: "xl", md: "xl", lg: "xl", xl: "xl" }} />
                        <Text fontSize={"xl"}>{name}</Text>
                        <Text fontSize={"md"}>Joined {moment(date).format("MMM Do, YYYY")}</Text>
                    </VStack>
                </Center>
            </CardBody>
            <CardFooter>
                <HStack>
                <Button colorScheme='blue' size={{base: "sm", sm: "sm", md: "md", lg: "md", xl: "md"}}>Create Post</Button>
                <Button colorScheme='teal' variant={"outline"} size={{base: "sm", sm: "sm", md: "md", lg: "md", xl: "md"}}>Edit Profile</Button>
                </HStack>
            </CardFooter>
        </Card>
    )
    return (
        <Fragment>
            <Container maxW={"7xl"} mt={4}>
                <Text fontSize={"3xl"} fontWeight={"bold"}>Dashboard</Text>
                <Text fontSize={"lg"} mt={1}>{greetingTime(new Date())}!</Text>
                {ProfileSummaryCard()}
                {
                    profile.error.msg ? (
                        <Box>
                            <Alert status='error' mt={4} borderRadius={"md"}>
                                <AlertIcon />
                                <AlertTitle>{profile.error.msg}</AlertTitle>
                            </Alert>
                            <Center>
                                <Link to={"/dashboard/create-profile"}><Button leftIcon={<AddIcon />} colorScheme='blue' variant='solid' mt={4}>Create Profile</Button></Link>
                            </Center>
                        </Box>

                    ) : (
                        <></>
                    )
                }
            </Container>
        </Fragment>
    )
}
