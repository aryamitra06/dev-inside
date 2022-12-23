import React, { Fragment, useEffect } from 'react'
import { Container, Text } from '@chakra-ui/react'
import CreateProfileForm from '../../components/Profile/CreateProfileForm'
import { useNavigate } from "react-router-dom";
import { tokenGetter } from '../../utils/tokenExtractor';
import { useSelector, useDispatch } from 'react-redux';
import { myProfileAction } from '../../redux/actions/profileAction';
import ServerErrorPage from "../Error/ServerErrorPage";

export default function CreateProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profileReducer = useSelector((state) => state.profileReducer);
    const { profile, error } = profileReducer;
    useEffect(() => {
        dispatch(myProfileAction());
        if (!tokenGetter()) {
            navigate("/");
        }
        //if profile is already created then navigate to homepage
        else if (!profile?.msg) {
            navigate("/");
        }

    }, [navigate, dispatch, profile?.isProfileCreated])

    return (
        <Fragment>
            {
                error ? (<ServerErrorPage statusCode={500}/>) : (
            <Container maxW={"6xl"} mt={3} minH={"72vh"}>
                <Text fontSize={"3xl"} fontWeight={"bold"} mb={3}>Create Profile</Text>
                <CreateProfileForm profileReducer={profileReducer} />
            </Container>
                )
            }
        </Fragment>
    )
}
