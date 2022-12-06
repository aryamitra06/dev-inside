import { Container, Text, Alert, AlertIcon, AlertTitle, Button, Center, Tag, Box } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import React, { Fragment, useEffect } from 'react'
import greetingTime from "greeting-time";
import { myProfileAction } from '../redux/actions/profileAction';

export default function Dashboard() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(myProfileAction());
    }, [])

    const profile = useSelector((state) => state.getprofile);
    return (
        <Fragment>
            <Container maxW={"7xl"} mt={4}>
                <Text fontSize={"3xl"} fontWeight={"bold"}>Dashboard</Text>
                <Text fontSize={"lg"} mt={2}>{greetingTime(new Date())}, Anamitra Chaudhuri!</Text>
                {
                    profile.error.msg ? (
                        <Box>
                            <Alert status='error' mt={4} borderRadius={"md"}>
                                <AlertIcon />
                                <AlertTitle>No profile found</AlertTitle>
                            </Alert>
                            <Center>
                                <Button leftIcon={<AddIcon />} colorScheme='blue' variant='solid' mt={4}>
                                    Create Profile
                                </Button>
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
