import React, { Fragment, useEffect } from 'react'
import { Alert, AlertIcon, Container, Text, Skeleton, SimpleGrid } from '@chakra-ui/react'
import EditProfileForm from '../../components/Profile/EditProfileForm'
import { useNavigate } from "react-router-dom";
import { tokenGetter } from '../../utils/tokenExtractor';
import { useSelector, useDispatch } from 'react-redux';
import { myProfileAction } from '../../redux/actions/profileAction';
export default function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const profileReducer = useSelector((state) => state.profileReducer);
    const { profile, profileLoading } = profileReducer;

    useEffect(() => {
        dispatch(myProfileAction());
        if (!tokenGetter()) {
            navigate("/");
        }
    }, [navigate, dispatch])


    return (
        <Fragment>
            <Container maxW={"6xl"} mt={3} minH={"72vh"}>
                <Text fontSize={"3xl"} fontWeight={"bold"} mb={3}>Edit Profile</Text>
                <>
                    {
                        profileLoading ? (
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
                                    !profile?.error?.msg ? (
                                        <EditProfileForm profileReducer={profileReducer} />
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
        </Container>
        </Fragment >
    )
}
