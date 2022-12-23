import { Button, Container, Image, Text } from '@chakra-ui/react';
import React, { Fragment } from 'react'
export default function ServerErrorPage({statusCode}) {
    return (
        <Fragment>
            <Container maxW={"6xl"} minH={"72vh"} mt={3} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                <Text fontSize={"5xl"} fontWeight={"bold"} color={"red.400"}>{statusCode}</Text>
                <Text fontSize={"xl"} fontWeight={"bold"} mb={5}>INTERNAL SERVER ERROR</Text>
                <Button onClick={() => window.location.reload()}>Refresh</Button>
            </Container>
        </Fragment>
    )
}
