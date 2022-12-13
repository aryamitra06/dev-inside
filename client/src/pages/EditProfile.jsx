import React, { Fragment, useEffect } from 'react'
import { Alert, AlertIcon, Container, Text, Progress, Skeleton, SimpleGrid } from '@chakra-ui/react'
import EditProfileForm from '../components/EditProfileForm'
import { useNavigate } from "react-router-dom";
import { idGetter } from '../utils/tokenIdGetter';
import { useSelector, useDispatch } from 'react-redux';
import { myProfileAction } from '../redux/actions/profileAction';
export default function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.getprofile);

    useEffect(() => {
        dispatch(myProfileAction());
        if (!idGetter()) {
            navigate("/");
        }
    }, [navigate, dispatch])


    return (
        <Fragment>
            {
                profile.loading ? (
                    <Progress size='xs' isIndeterminate />
                ) : (
                    <Container maxW={"7xl"} mt={4}>
                        {
                            !profile?.error?.msg && profile?.response?.isProfileCreated !== true && (
                                <Alert status='error'>
                                    <AlertIcon />
                                    Please create your profile before edit.
                                </Alert>
                            )
                        }
                    </Container>
                )
            }
            <Container maxW={"7xl"} mt={4}>
                <Text fontSize={"3xl"} fontWeight={"bold"} mb={3}>Edit Profile</Text>
                {
                    profile.loading ? (
                        <>
                            <SimpleGrid columns={2} gap={5}>
                                <Skeleton height={"150px"} />
                                <Skeleton height={"150px"} />
                                <Skeleton height={"100px"} />
                                <Skeleton height={"100px"} />
                                <Skeleton height={"70px"} />
                                <Skeleton height={"70px"} />
                                <Skeleton height={"50px"} />
                                <Skeleton height={"50px"} />
                            </SimpleGrid>
                        </>
                    ) : (
                        <>
                            {!profile?.error?.msg ? (
                                <EditProfileForm profile={profile} />
                            ) : (
                                <Alert status='error'>
                                    <AlertIcon />
                                    {profile?.error?.msg}
                                </Alert>
                            )
                            }
                        </>
                    )
                }
            </Container>
        </Fragment>
    )
}
