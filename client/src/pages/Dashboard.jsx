import { Container, Text, Alert, AlertIcon, AlertTitle, Button, Center, Box, Card, CardBody, Progress, Avatar, VStack, HStack } from '@chakra-ui/react';
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


    // const ProfileSummaryCard = () => (
    //     <Card align='center' mt={3}>
    //         <CardBody>
    //             <Center>
    //                 <VStack>
    //                     <Avatar src={avatar} bgGradient='linear(to-l, #f2709c, #ff9472)' padding={1} size={{ base: "lg", sm: "xl", md: "xl", lg: "xl", xl: "xl" }} />
    //                     <Text fontSize={"xl"}>{name}</Text>
    //                     <Text fontSize={"md"}>Joined {moment(date).format("MMM Do, YYYY")}</Text>
    //                 </VStack>
    //             </Center>
    //         </CardBody>
    //         {(profile.response.isProfileCreated === true) && (
    //             <HStack mb={5}>
    //                 <Button colorScheme='blue' size={{ base: "sm", sm: "sm", md: "md", lg: "md", xl: "md" }}>Create Post</Button>
    //                 <Link to={"/dashboard/edit-profile"}><Button colorScheme='teal' variant={"outline"} size={{ base: "sm", sm: "sm", md: "md", lg: "md", xl: "md" }}>Edit Profile</Button></Link>
    //             </HStack>
    //         )
    //         }
    //     </Card>
    // )
    return (
        <Fragment>
            {
                profile.loading && (
                    <Progress size='xs' isIndeterminate />
                )
            }
            <Container maxW={"7xl"} mt={4}>
                <Text fontSize={"3xl"} fontWeight={"bold"}>Dashboard</Text>
                <Text fontSize={"lg"} mt={1}>{greetingTime(new Date())}!</Text>
            </Container>
        </Fragment>
    )
}
