import { Tag, Alert, AlertIcon, Skeleton, Stack, Input, Box, SimpleGrid } from "@chakra-ui/react";
import React, { Fragment } from "react";
import PostCard from "../PostById/PostCard";

export default function AllPosts({ postReducer }) {
  const { posts, postsLoading, error, isLikeUpdating, isDeleting } = postReducer;
  return (
    <Fragment>
      {
        error ? (
          <></>
        ) : (
          <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={3}>
            <Box display={"flex"} gap={2}>
              {postsLoading ? <Skeleton width={"80px"} height={"30px"} /> : <Tag size={"lg"} variant={"solid"} colorScheme={"blue"}>Latest</Tag>}
              {postsLoading ? <Skeleton width={"80px"} height={"30px"} /> : <Tag size={"lg"} variant={"outline"} colorScheme={"red"}>Popular</Tag>}
            </Box>
            <Input type='text' placeholder='Search...' width={{ base: "180px", sm: "200px", md: "250px", lg: "250px", xl: "250px" }} variant={"outline"} isDisabled={postsLoading} size={"sm"} />
          </Box>
        )
      }
      {
        error ? (
          <Alert status='error'>
            <AlertIcon />
            {error?.msg}
          </Alert>
        ) : (
          <>
            {
              (postsLoading) ? (
                <>
                  <Stack>
                    <Skeleton height={"250px"} />
                    <Skeleton height={"250px"} />
                    <Skeleton height={"250px"} />
                  </Stack>
                </>
              ) : (
                <SimpleGrid columns={1} spacing={3}>
                  {
                    posts?.map((e) => (
                      <PostCard key={e?._id} postData={e} isLikeUpdating={isLikeUpdating} isDeleting={isDeleting}/>
                    ))
                  }
                </SimpleGrid>
              )
            }
          </>
        )
      }
    </Fragment>
  )
}
