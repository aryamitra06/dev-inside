import { Tag, Alert, AlertIcon, Skeleton, Stack } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import PostCard from '../components/PostCard'

export default function AllPosts({ postRes }) {
  const { response, loading, error } = postRes;
  console.log(response);
  return (
    <Fragment>
      <Tag size={"lg"} variant={"subtle"} colorScheme={"blue"} mb={3}>Latest</Tag>
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
                <Skeleton height={"250px"}/>
                <Skeleton height={"250px"}/>
                <Skeleton height={"250px"}/>
                </Stack>
                </>
              ) : (
                <>
                {response?.map((e)=> (
                  <PostCard key={e?._id} data={e}/>
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
