import { Avatar, Box, Button, Card, CardBody, Center, Tag, Text } from '@chakra-ui/react'
import React, { Fragment } from 'react'

export default function PostProfileOverviewCard({data}) {
  const {response, loading, error} = data;
  console.log(response);
  return (
    <Fragment>
      <Card variant={"outline"} borderRadius={"xl"} overflow={"hidden"} mb={5} boxShadow={"lg"}>
        <Box bgGradient='linear(to-l, #5433FF, #20BDFF)' height={"13px"}/>
        <Box display={"flex"} alignItems={"center"} flexDirection={"column"} justifyContent={"center"} mt={6}>
          <Avatar />
          <Text mt={1} fontSize={"xl"} fontWeight={"bold"}>{response?.user?.name}</Text>
        </Box>
        <Center>
        </Center>
        <CardBody>
          <Button colorScheme={"blue"} w={"100%"} mb={3}>View Profile</Button>
          <Text color={"gray.400"} fontSize={"sm"}>John Doe and Jane Doe are multiple-use placeholder names that are used when the true name of a person is unknown or is being intentionally concealed. In the context of law enforcement in the United States, such names are often used to refer to a corpse whose identity is unknown or unconfirmed.</Text>
          <Tag mt={3} mb={2}>Location</Tag>
          <Text color={"gray.400"} fontSize={"sm"}>USA</Text>
          <Tag mt={3} mb={2}>Work</Tag>
          <Text color={"gray.400"} fontSize={"sm"}>SDE at Amazon</Text>
          <Tag mt={3} mb={2}>Joined</Tag>
          <Text color={"gray.400"} fontSize={"sm"}>16 Oct 2019</Text>
        </CardBody>
      </Card>
    </Fragment>
  )
}
