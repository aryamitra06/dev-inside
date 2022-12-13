import { Tag, Alert, AlertIcon, Skeleton, Stack, Input, Box } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import PostCard from '../components/PostCard'

export default function AllPosts({ postRes }) {
  const { response, loading, error } = postRes;
  console.log(response);


  return (
    <Fragment>
      {
        error ? (
          <>
          </>
        ) : (
      <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={3}>
        <Box display={"flex"} gap={2}>
        {loading ? <Skeleton width={"80px"} height={"30px"}/> : <Tag size={"lg"} variant={"solid"} colorScheme={"blue"}>Latest</Tag>}
        {loading ? <Skeleton width={"80px"} height={"30px"}/> : <Tag size={"lg"} variant={"outline"} colorScheme={"red"}>Popular</Tag>}
        </Box>
        <Input type='text' placeholder='Search...' width={{base: "180px", sm: "200px", md: "250px", lg: "250px", xl: "250px"}} variant={"outline"} isDisabled={loading} size={"sm"} />
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
              loading ? (
                <>
                  <Stack>
                    <Skeleton height={"250px"} />
                    <Skeleton height={"250px"} />
                    <Skeleton height={"250px"} />
                  </Stack>
                </>
              ) : (
                <>
                  {response?.map((e) => (
                    <PostCard key={e?._id} data={e} />
                  ))}
                </>
              )
            }
          </>
        )
      }
    </Fragment>
  )
}
