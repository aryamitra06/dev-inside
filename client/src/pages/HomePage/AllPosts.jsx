import { Tag, Alert, AlertIcon, Skeleton, Stack, Input, Box } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import PostCard from '../../components/Post/PostCard'

export default function AllPosts({ postRes, isLikeUpdating}) {
  const { posts, loading, error } = postRes;

  return (
    <Fragment>
      {
        error || posts?.length === 0 ? (
          <>
          </>
        ) : (
          <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={3}>
            <Box display={"flex"} gap={2}>
              {loading ? <Skeleton width={"80px"} height={"30px"} /> : <Tag size={"lg"} variant={"solid"} colorScheme={"blue"}>Latest</Tag>}
              {loading ? <Skeleton width={"80px"} height={"30px"} /> : <Tag size={"lg"} variant={"outline"} colorScheme={"red"}>Popular</Tag>}
            </Box>
            <Input type='text' placeholder='Search...' width={{ base: "180px", sm: "200px", md: "250px", lg: "250px", xl: "250px" }} variant={"outline"} isDisabled={loading} size={"sm"} />
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
              (loading || posts.length === 0) ? (
                <>
                  <Stack>
                    <Skeleton height={"250px"} />
                    <Skeleton height={"250px"} />
                    <Skeleton height={"250px"} />
                  </Stack>
                </>
              ) : (
                <>
                  {

                    posts?.map((e) => (
                      <PostCard key={e?._id} data={e} isLikeUpdating={isLikeUpdating}/>
                    ))
                  }
                </>
              )
            }
          </>
        )
      }
    </Fragment>
  )
}
