import { Avatar, Box, Button, Card, CardBody, Center, Tag, Text, Alert, AlertIcon, Skeleton, Stack } from '@chakra-ui/react'
import React, { Fragment, memo } from 'react'
import { Link } from "react-router-dom";
import moment from 'moment';
const PostProfileOverviewCard = ({ data }) => {
  const { response, loading, error } = data;
  return (
    <Fragment>
      {
        loading ? (
          <Stack>
            <Skeleton height={"200px"} />
            <Skeleton height={"100px"} />
            <Skeleton height={"70px"} />
          </Stack>
        ) : (
          <>
            {
              error ? (
                <Alert status='error'>
                  <AlertIcon />
                  {error?.msg}
                </Alert>
              ) : (
                <Card variant={"outline"} borderRadius={"xl"} overflow={"hidden"} mb={5} boxShadow={"lg"}>
                  <Box bgGradient='linear(to-l, #5433FF, #20BDFF)' height={"13px"} />
                  <Box display={"flex"} alignItems={"center"} flexDirection={"column"} justifyContent={"center"} mt={6}>
                    <Link to={`/profile/${response?.user?._id}`}><Avatar src={response?.user?.avatar} size={"lg"} bgGradient='linear(to-l, #85E7FC, #90CDF4)' p={"3px"} shadow={"md"} /></Link>
                    <Link to={`/profile/${response?.user?._id}`}><Text mt={1} fontSize={"xl"} fontWeight={"bold"}>{response?.user?.name}</Text></Link>
                  </Box>
                  <Center>
                  </Center>
                  <CardBody>
                    <Link to={`/profile/${response?.user?._id}`}><Button colorScheme={"blue"} w={"100%"} mb={3}>View Profile</Button></Link>
                    <Text color={"gray.400"} fontSize={"sm"}>{response?.bio}</Text>
                    <Tag mt={3} mb={2}>Location</Tag>
                    <Text color={"gray.400"} fontSize={"sm"}>{response?.location || <>Not available</>}</Text>
                    <Tag mt={3} mb={2}>Work</Tag>
                    <Text color={"gray.400"} fontSize={"sm"}>{response?.status} {response?.company && <>at</>} {response?.company}</Text>
                    <Tag mt={3} mb={2}>Joined</Tag>
                    <Text color={"gray.400"} fontSize={"sm"}>{moment(response?.date).format("MMM Do YY")}</Text>
                  </CardBody>
                </Card>
              )
            }
          </>
        )
      }
    </Fragment>
  )
}

export default memo(PostProfileOverviewCard);
