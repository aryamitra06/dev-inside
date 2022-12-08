import React, { Fragment, useEffect } from 'react'
import { Alert, AlertIcon, Container, Text, Progress } from '@chakra-ui/react'
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
                            profile.response.isProfileCreated === undefined ? (
                                <Alert status='error' borderRadius={"md"}>
                                    <AlertIcon />
                                    Please create your profile before edit.
                                </Alert>
                            ) : (
                                <>
                                    <Text fontSize={"3xl"} fontWeight={"bold"} mb={3}>Edit Profile</Text>
                                    <EditProfileForm profile={profile}/>
                                </>
                            )
                        }
                    </Container>
                )
            }
        </Fragment>
    )
}
