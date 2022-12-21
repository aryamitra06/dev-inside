import { Card, CardBody, SimpleGrid, Text, Alert, AlertIcon, Skeleton, Stack, HStack, Avatar, Box, Tag } from '@chakra-ui/react'
import React, { Fragment, memo } from 'react'
import { Link } from 'react-router-dom';

const AllProfilesCard = ({ allProfilesReducer }) => {
    const { error, loading, response } = allProfilesReducer;
    console.log(response);

    const ProfilesCard = () => (
        <SimpleGrid columns={1} spacing={2}>
            {
                response?.map((e) => (
                    <Link to={`/profile/${e?.user?._id}`}>
                    <Card overflow={"hidden"} variant={"elevated"} key={e?._id} cursor={"pointer"} transition={"0.3s"} border={"2px solid transparent"} _hover={{
                        border: "2px solid #82AAE3",
                        transition: "0.3s"
                    }}>
                        <CardBody>
                            <HStack spacing={3}>
                                <Avatar size={"md"} p={"3px"} bgGradient='linear(to-l, #85E7FC, #90CDF4)' src={e?.user?.avatar} />
                                <Box display={"flex"} flexDirection={"column"} gap={1}>
                                    <Text fontWeight={"bold"}>{e?.user?.name}</Text>
                                    <Tag colorScheme={"blue"} width={"max-content"}>{e?.status} {e?.company && <>at</>} {e?.company}</Tag>
                                </Box>
                            </HStack>
                        </CardBody>
                    </Card>
                    </Link>
                ))
            }
        </SimpleGrid>
    )
    return (
        <Fragment>
            <Card variant={"filled"} overflow={"hidden"} borderRadius={"xl"} height={"500px"} overflowY={"auto"}>
            <Box bgGradient='linear(to-l, #5433FF, #20BDFF)' height={"13px"} />
            <Box p={3}>
                <Text fontSize={"xl"} fontWeight={"bold"} mb={3}>TOP DEVINSIDERS</Text>
                {
                    loading ? (
                        <>
                            <Stack>
                                <Skeleton height='70px' />
                                <Skeleton height='70px' />
                                <Skeleton height='70px' />
                                <Skeleton height='70px' />
                            </Stack>
                        </>
                    ) : (
                        <>
                            {
                                error ? (
                                    <Alert status='error' >
                                        <AlertIcon />
                                        {error?.msg}
                                    </Alert>
                                ) : (
                                    <>
                                        {ProfilesCard()}
                                    </>
                                )
                            }
                        </>
                    )
                }
            </Box>
            </Card >
        </Fragment >
    )
}

export default memo(AllProfilesCard);