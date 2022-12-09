import { Container, Text, Alert, AlertIcon, Box, Progress, Skeleton, Button, HStack, Stack, Tabs, TabList, Tab, TabPanels, TabPanel, Card, CardBody, IconButton, SimpleGrid } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import moment from "moment";
import { MdAdd, MdWork, MdSchool } from 'react-icons/md';
import { AiFillDelete, AiFillEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import React, { Fragment, useEffect } from 'react'
import greetingTime from "greeting-time";
import { myProfileAction } from '../redux/actions/profileAction';
import ExpCard from '../components/ExpCard';
import EduCard from '../components/EduCard';

export default function Dashboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(myProfileAction());
    }, [dispatch])

    const profile = useSelector((state) => state.getprofile);

    console.log(profile?.response);
    const isProfileCreated = profile?.response?.isProfileCreated

    const ProfileCreatedCheker = () => {
        return (
            <Fragment>
                {
                    isProfileCreated === undefined && (
                        <Alert status='error' mt={2}>
                            <AlertIcon />
                            Profile is not created.
                        </Alert>
                    )
                }
            </Fragment>
        )
    }

    const ProfileActions = () => {
        return (
            <Fragment>
                <HStack mt={5}>
                    {
                        isProfileCreated === undefined ? (
                            <Link to={"/dashboard/create-profile"}><Button colorScheme={"blue"} variant={"outline"}>Create Profile</Button></Link>
                        ) : (
                            <>
                                <HStack>
                                    <Link to={"/dashboard/edit-profile"}><Button colorScheme={"cyan"} variant={"outline"} size={"sm"}>Edit Profile</Button></Link>
                                    <Link to={"/dashboard/add-experience"}><Button colorScheme={"cyan"} variant={"ghost"} size={"sm"} leftIcon={<MdAdd />}>Experience</Button></Link>
                                    <Link to={"/dashboard/add-education"}><Button colorScheme={"cyan"} variant={"ghost"} size={"sm"} leftIcon={<MdAdd />}>Education</Button></Link>
                                </HStack>
                            </>
                        )
                    }
                </HStack>
            </Fragment>
        )
    }

    const ExperienceSection = () => {
        return (
            <>
                <SimpleGrid columns={1} spacing={3}>
                    <ExpCard />
                </SimpleGrid>
            </>
        )
    }

    const EducationSection = () => {
        return (
            <>
                <SimpleGrid columns={1} spacing={3}>
                    <EduCard />
                </SimpleGrid>
            </>
        )
    }

    const ProfileTabs = () => {
        return (
            <Tabs mt={6} width={{ base: "100%", sm: "100%", md: "70%", lg: "70%", xl: "70%" }} variant='soft-rounded' colorScheme='blue'>
                <TabList>
                    <Tab>Experience</Tab>
                    <Tab>Education</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        {ExperienceSection()}
                    </TabPanel>
                    <TabPanel>
                        {EducationSection()}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        )
    }

    return (
        <Fragment>
            {
                profile.loading && (
                    <Progress size='xs' isIndeterminate />
                )
            }
            <Container maxW={"7xl"} mt={4}>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Text fontSize={"3xl"} fontWeight={"bold"}>Dashboard</Text>
                    <Button leftIcon={<AiFillEye />} size={"sm"}>View Public</Button>
                </Box>
                <Box display={"flex"} gap={1}>
                    <Text fontSize={"xl"} mt={1} color={'gray.400'}>{greetingTime(new Date())},</Text>
                    {profile.loading ? <Skeleton width={20} height={5} mt={3} /> : <Text fontSize={"xl"} mt={1} color={'gray.400'}>{profile?.response?.user?.name}!</Text>}
                </Box>
                {
                    profile.loading ? (
                        <>
                            <Stack mt={3}>
                                <HStack>
                                    <Skeleton width={"20%"} height={"40px"} />
                                    <Skeleton width={"20%"} height={"40px"} />
                                    <Skeleton width={"20%"} height={"40px"} />
                                </HStack>
                                <Skeleton width={"100%"} height={"40px"} />
                                <Skeleton width={"100%"} height={"80px"} />
                                <Skeleton width={"100%"} height={"30px"} />
                                <Skeleton width={"75%"} height={"50px"} />
                                <Skeleton width={"75%"} height={"100px"} />
                                <Skeleton width={"75%"} height={"50px"} />
                                <Skeleton width={"75%"} height={"100px"} />
                                <Skeleton width={"15%"} height={"30px"} />
                            </Stack>
                        </>
                    ) : (
                        <>
                            {ProfileCreatedCheker()}
                            {ProfileActions()}
                            {ProfileTabs()}
                        </>
                    )
                }

            </Container>
        </Fragment>
    )
}
