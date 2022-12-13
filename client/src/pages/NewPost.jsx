import React, { Fragment, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { tokenGetter } from '../utils/tokenIdGetter';
import { Container, Text, Grid, GridItem } from "@chakra-ui/react";

export default function NewPost() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!tokenGetter()) {
            navigate("/");
        }
    }, [navigate])
    return (
        <Fragment>
            <Container maxW={"7xl"} mt={4}>
                <Text fontSize={"3xl"} fontWeight={"bold"} mb={3}>Create Post</Text>
                <Grid
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(12, 1fr)'
                    gap={3}
                >
                    <GridItem rowSpan={1} colSpan={3} display={{ base: "none", sm: "none", md: "none", lg: "block", xl: "block" }}>nice</GridItem>
                    <GridItem rowSpan={1} colSpan={{ base: 12, sm: 12, md: 12, lg: 6, xl: 6 }}>nice</GridItem>
                </Grid>
            </Container>
        </Fragment>
    )
}
