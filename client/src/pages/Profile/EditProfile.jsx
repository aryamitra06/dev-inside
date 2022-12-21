import React, { Fragment, useEffect } from 'react'
import { Alert, AlertIcon, Container, Text, Skeleton, SimpleGrid } from '@chakra-ui/react'
import EditProfileForm from '../../components/Profile/EditProfileForm'
import { useNavigate } from "react-router-dom";
import { idGetter } from '../../utils/tokenExtractor';
import { useSelector, useDispatch } from 'react-redux';
import { myProfileAction } from '../../redux/actions/profileAction';
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
            <Container maxW={"6xl"} mt={3}>
                <Text fontSize={"3xl"} fontWeight={"bold"} mb={3}>Edit Profile</Text>
                <>
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
                                {
                                    !profile?.error?.msg && profile?.response?.isProfileCreated !== true ? (
                                        <Alert status='error'>
                                            <AlertIcon />
                                            Please create your profile before edit.
                                        </Alert>
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
                            </>
                        )
                    }
                </>
            </Container>
        </Fragment>
    )
}
