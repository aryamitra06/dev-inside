import { Avatar, Box, Button, Card, CardBody, Center, Tag, Text, Alert, AlertIcon, Skeleton, Stack } from '@chakra-ui/react'
import React, { Fragment, memo } from 'react'
import { Link } from "react-router-dom";
import moment from 'moment';
const PostProfileOverviewCard = ({ profileReducer }) => {
  const { profileById, profileByIdLoading, error } = profileReducer;
  return (
    <Fragment>
      {
        profileByIdLoading ? (
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
                <Card variant={"filled"} borderRadius={"xl"} overflow={"hidden"} mb={5}>
                  <Box bgGradient='linear(to-l, #5433FF, #20BDFF)' height={"5px"} />
                  <Box display={"flex"} alignItems={"center"} flexDirection={"column"} justifyContent={"center"} mt={6}>
                    <Link to={`/profile/${profileById?.user?._id}`}><Avatar src={profileById?.user?.avatar} size={"lg"} bgGradient='linear(to-l, #85E7FC, #90CDF4)' p={"3px"} shadow={"md"} /></Link>
                    <Link to={`/profile/${profileById?.user?._id}`}><Text mt={1} fontSize={"xl"} fontWeight={"bold"}>{profileById?.user?.name}</Text></Link>
                  </Box>
                  <Center>
                  </Center>
                  <CardBody>
                    <Link to={`/profile/${profileById?.user?._id}`}><Button colorScheme={"blue"} w={"100%"} mb={3}>View Profile</Button></Link>
                    <Text fontSize={"sm"}>{profileById?.bio}</Text>
                    <Tag mt={3} mb={2} colorScheme="blue">Location</Tag>
                    <Text fontSize={"sm"}>{profileById?.location || <>Not available</>}</Text>
                    <Tag mt={3} mb={2} colorScheme="blue">Work</Tag>
                    <Text fontSize={"sm"}>{profileById?.status} {profileById?.company && <>at</>} {profileById?.company}</Text>
                    <Tag mt={3} mb={2} colorScheme="blue">Joined</Tag>
                    <Text fontSize={"sm"}>{moment(profileById?.date).format("MMM Do YY")}</Text>
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
