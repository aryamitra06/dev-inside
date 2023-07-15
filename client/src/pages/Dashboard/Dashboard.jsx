import React, { Fragment, useEffect } from 'react'
import { Container, Text, Alert, AlertIcon, Box, Skeleton, Button, HStack, Stack, Tabs, TabList, Tab, TabPanels, TabPanel, SimpleGrid } from '@chakra-ui/react';
import { Link, useNavigate } from "react-router-dom";
import { MdAdd } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import greetingTime from "greeting-time";
import { myProfileAction } from '../../redux/actions/profileAction';
import ExpCard from '../../components/Dashboard/ExpCard';
import EduCard from '../../components/Dashboard/EduCard';
import { nameGetter, tokenGetter } from '../../utils/tokenExtractor';
import Stats from '../../components/Dashboard/Stats';
import ServerErrorPage from "../Error/ServerErrorPage";
import { isEmpty } from "../../utils/objEmptyChecker";

export default function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!tokenGetter()) {
            navigate("/");
        }
        dispatch(myProfileAction());
    }, [dispatch, navigate]);

    const profileReducer = useSelector((state) => state.profileReducer);

    const { error, profile, profileLoading } = profileReducer;

    const isProfileEmpty = isEmpty(profile || {});


    const ProfileCreatedCheker = () => {
        return (
            <Fragment>
                {
                    (isProfileEmpty) && (
                        <Alert status='info' mt={3}>
                            <AlertIcon />
                            Profile not created.
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
                        (isProfileEmpty) ? (
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
                        <Button colorScheme={"blue"} variant={"ghost"} mb={4} size={{ base: "sm", sm: "sm", md: "md", lg: "md", xl: "md" }} leftIcon={<MdAdd />}>Experience</Button>
                    </Box>
                </Link>
                <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 2 }} spacing={3}>
                    {
                        profile?.experience?.length === 0 && (
                            <Alert status='info'>
                                <AlertIcon />
                                Not available
                            </Alert>
                        )
                    }
                    {
                        profile?.experience?.map((e) => (
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
                        <Button colorScheme={"blue"} variant={"ghost"} mb={4} size={{ base: "sm", sm: "sm", md: "md", lg: "md", xl: "md" }} leftIcon={<MdAdd />}>Education</Button>
                    </Box>
                </Link>
                <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 2 }} spacing={3}>
                    {
                        profile?.education?.length === 0 && (
                            <Alert status='info'>
                                <AlertIcon />
                                Not available
                            </Alert>
                        )
                    }
                    {
                        profile?.education?.map((e) => (
                            <EduCard key={e._id} data={e} />
                        ))
                    }
                </SimpleGrid>
            </>
        )
    }

    const ProfileTabs = () => {
        return (
            <Tabs mt={6} colorScheme='blue' variant='soft-rounded' isFitted>
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
                error ? (<ServerErrorPage statusCode={500} />) : (
                    <Container maxW={"6xl"} mt={3} minH={"72vh"}>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                            <Text fontSize={"3xl"} fontWeight={"bold"}>Dashboard</Text>
                            {
                                !isProfileEmpty && (
                                    <Link to={`/profile/${profile?.user?._id}`}><Button leftIcon={<AiFillEye />} size={"sm"} isDisabled={profileLoading}>View Public</Button></Link>
                                )
                            }
                        </Box>
                        <Box display={"flex"} gap={1}>
                            <Text fontSize={{ base: "lg", sm: "md", md: "xl", lg: "xl", xl: "xl" }} mt={1} color={'gray.400'} fontWeight={"bold"}>{greetingTime(new Date())},</Text>
                            <Text fontSize={{ base: "lg", sm: "md", md: "xl", lg: "xl", xl: "xl" }} mt={1} color={'gray.400'} fontWeight={"bold"}>{nameGetter()}</Text>
                        </Box>
                        {
                            profileLoading ? (
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
                                    {ProfileCreatedCheker()}
                                    {/* {!isProfileEmpty && <Stats />} */}
                                    {ProfileActions()}
                                    {!isProfileEmpty && ProfileTabs()}
                                </>
                            )
                        }

                    </Container>
                )
            }
        </Fragment >
    )
}
