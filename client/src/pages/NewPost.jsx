import React, { Fragment, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { tokenGetter } from '../utils/tokenExtractor';
import { Container, Text } from "@chakra-ui/react";
import NewPostForm from '../components/NewPostForm';

export default function NewPost() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!tokenGetter()) {
            navigate("/");
        }
    }, [navigate])
    return (
        <Fragment>
            <Container maxW={"5xl"} mt={4}>
                <Text fontSize={"3xl"} fontWeight={"bold"} mb={3}>Create Post</Text>
                <NewPostForm/>
            </Container>
        </Fragment>
    )
}
