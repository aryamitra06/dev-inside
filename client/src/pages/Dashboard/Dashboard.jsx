import React, { Fragment, useEffect } from 'react'
import { Container, Text, Alert, AlertIcon, Box, Progress, Skeleton, Button, HStack, Stack, Tabs, TabList, Tab, TabPanels, TabPanel, SimpleGrid } from '@chakra-ui/react';
import { Link, useNavigate } from "react-router-dom";
import { MdAdd } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import greetingTime from "greeting-time";
import { myProfileAction } from '../../redux/actions/profileAction';
import ExpCard from '../../components/Dashboard/ExpCard';
import EduCard from '../../components/Dashboard/EduCard';
import { stateReseter } from '../../redux/actions/utilsAction';
import { tokenGetter } from '../../utils/tokenExtractor';

export default function Dashboard() {
    const toggleState = useSelector((state) => state.togglevalue);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!tokenGetter()) {
            navigate("/");
        }
        dispatch(myProfileAction());
        dispatch(stateReseter());
    }, [dispatch, navigate, toggleState]);

    const profile = useSelector((state) => state.getprofile);

    console.log(profile);

    const profileRes = profile?.response;
    const isProfileCreated = profile?.response?.isProfileCreated;
    const profileError = profile?.error;

    //server error
    const ErrorMsg = () => (
        <Fragment>
            {
                profileError && (
                    <Alert status='error' mt={3}>
                        <AlertIcon />
                        {profileError?.msg}
                    </Alert>
                )
            }
        </Fragment>
    )
    const ProfileCreatedCheker = () => {
        return (
            <Fragment>
                {
                    (isProfileCreated !== true) && (
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
                        isProfileCreated !== true ? (
                            <Link to={"/dashboard/create-profile"}><Button colorScheme={"blue"} variant={"outline"}>Create Profile</Button></Link>
                        ) : (
                            <>
                                <HStack>
                                    <Link to={"/dashboard/edit-profile"}><Button colorScheme={"blue"} variant={"solid"} size={{ base: "sm", sm: "sm", md: "md", lg: "md", xl: "md" }}>Edit Profile</Button></Link>
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
                <Link to={"/dashboard/add-experience"}>
                    <Box display={"flex"} justifyContent={"flex-end"}>
                        <Button colorScheme={"blue"} variant={"outline"} mb={4} size={{ base: "sm", sm: "sm", md: "md", lg: "md", xl: "md" }} leftIcon={<MdAdd />}>Experience</Button>
                    </Box>
                </Link>
                <SimpleGrid columns={1} spacing={3}>
                    {
                        profileRes?.experience?.length === 0 && (
                            <Alert status='warning'>
                                <AlertIcon />
                                Not available
                            </Alert>
                        )
                    }
                    {
                        profileRes?.experience?.map((e) => (
                            <ExpCard key={e._id} data={e} />
                        ))
                    }
                </SimpleGrid>
            </>
        )
    }

    const EducationSection = () => {
        return (
            <>
                <Link to={"/dashboard/add-education"}>
                    <Box display={"flex"} justifyContent={"flex-end"}>
                    <Button colorScheme={"blue"} variant={"outline"} mb={4} size={{ base: "sm", sm: "sm", md: "md", lg: "md", xl: "md" }} leftIcon={<MdAdd />}>Education</Button>
                    </Box>
                </Link>
                <SimpleGrid columns={1} spacing={3}>
                    {
                        profileRes?.education?.length === 0 && (
                            <Alert status='warning'>
                                <AlertIcon />
                                Not available
                            </Alert>
                        )
                    }
                    {
                        profileRes?.education?.map((e) => (
                            <EduCard key={e._id} data={e} />
                        ))
                    }
                </SimpleGrid>
            </>
        )
    }

    const ProfileTabs = () => {
        return (
            <Tabs mt={6} width={{ base: "100%", sm: "100%", md: "70%", lg: "70%", xl: "70%" }} colorScheme='blue' variant='soft-rounded' isFitted>
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
                    {
                        isProfileCreated === true && (
                            <Link to={`/profile/${profileRes?.user?._id}`}><Button leftIcon={<AiFillEye />} size={"sm"} isDisabled={profile.loading}>View Public</Button></Link>
                        )
                    }
                </Box>
                {ErrorMsg()}
                <Box display={"flex"} gap={1}>
                    {
                        isProfileCreated === true && (
                            <>
                                <Text fontSize={{ base: "lg", sm: "md", md: "xl", lg: "xl", xl: "xl" }} mt={1} color={'gray.200'}>{greetingTime(new Date())},</Text>
                                {profile.loading ? <Skeleton width={20} height={5} mt={3} /> : <Text fontSize={{ base: "lg", sm: "md", md: "xl", lg: "xl", xl: "xl" }} mt={1} color={'gray.200'}>{profile?.response?.user?.name}</Text>}
                            </>
                        )
                    }
                </Box>
                {
                    profile.loading ? (
                        <>
                            <Stack mt={3}>
                                <HStack>
                                    <Skeleton width={{ base: "25%", sm: "10%", md: "10%", lg: "10%", xl: "10%" }} height={"40px"} />
                                    <Skeleton width={{ base: "25%", sm: "10%", md: "10%", lg: "10%", xl: "10%" }} height={"40px"} />
                                    <Skeleton width={{ base: "25%", sm: "10%", md: "10%", lg: "10%", xl: "10%" }} height={"40px"} />
                                </HStack>
                                <HStack>
                                    <Skeleton width={{ base: "35%", sm: "20%", md: "20%", lg: "20%", xl: "20%" }} height={"50px"} />
                                    <Skeleton width={{ base: "35%", sm: "20%", md: "20%", lg: "20%", xl: "20%" }} height={"50px"} />
                                </HStack>
                                <Skeleton width={{ base: "100%", sm: "70%", md: "70%", lg: "70%", xl: "70%" }} height={"100px"} />
                                <Skeleton width={{ base: "100%", sm: "70%", md: "70%", lg: "70%", xl: "70%" }} height={"100px"} />
                                <Skeleton width={{ base: "100%", sm: "70%", md: "70%", lg: "70%", xl: "70%" }} height={"100px"} />
                            </Stack>
                        </>
                    ) : (
                        <>
                            {!profileError && ProfileCreatedCheker()}
                            {!profileError && ProfileActions()}
                            {isProfileCreated === true && ProfileTabs()}
                        </>
                    )
                }

            </Container>
        </Fragment>
    )
}
