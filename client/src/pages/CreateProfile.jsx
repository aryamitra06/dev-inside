import React, { Fragment, useEffect } from 'react'
import { Container, Text } from '@chakra-ui/react'
import CreateProfileForm from '../components/CreateProfileForm'
import { useNavigate } from "react-router-dom";
import { idGetter } from '../utils/tokenIdGetter';
import { useSelector, useDispatch } from 'react-redux';
import { myProfileAction } from '../redux/actions/profileAction';
export default function CreateProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.getprofile);
    useEffect(() => {
        dispatch(myProfileAction());
        if (!idGetter()) {
            navigate("/");
        }
        else if (profile.response.isProfileCreated) {
            navigate("/");
        }
    }, [navigate, dispatch, profile.response.isProfileCreated])

    return (
        <Fragment>
            <Container maxW={"7xl"} mt={4}>
                <Text fontSize={"3xl"} fontWeight={"bold"} mb={3}>Create Profile</Text>
                <CreateProfileForm />
            </Container>
        </Fragment>
    )
}
