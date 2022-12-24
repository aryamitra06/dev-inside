import React, { Fragment, useEffect } from 'react'
import { Container, Text, Alert, AlertIcon } from '@chakra-ui/react'
import CreateProfileForm from '../../components/Profile/CreateProfileForm'
import { useNavigate } from "react-router-dom";
import { tokenGetter } from '../../utils/tokenExtractor';
import { useSelector, useDispatch } from 'react-redux';
import { myProfileAction } from '../../redux/actions/profileAction';
import ServerErrorPage from "../Error/ServerErrorPage";
import { isEmpty } from "../../utils/objEmptyChecker";

export default function CreateProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profileReducer = useSelector((state) => state.profileReducer);
    const { profile, error, loading } = profileReducer;
    useEffect(() => {
        dispatch(myProfileAction());
        if (!tokenGetter()) {
            navigate("/");
        }
    }, [navigate, dispatch])
    
    const isProfileEmpty = isEmpty(profile);
    return (
        <Fragment>
            {
                error ? (<ServerErrorPage statusCode={500} />) : (
                    <Container maxW={"6xl"} mt={3} minH={"72vh"}>
                        {
                            isProfileEmpty ? (
                                <>
                                    <Text fontSize={"3xl"} fontWeight={"bold"} mb={3}>Create Profile</Text>
                                    <CreateProfileForm profileReducer={profileReducer} />
                                </>
                            ) : (
                                <Alert status='info'>
                                    <AlertIcon />
                                    Your profile is already created
                                </Alert>
                            )
                        }
                    </Container>
                )
            }
        </Fragment>
    )
}
