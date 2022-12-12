import { Container, Progress, SimpleGrid, Skeleton, Stack, Alert, AlertIcon } from '@chakra-ui/react'
import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import { profileByIdAction } from '../redux/actions/profileAction';

export default function ViewPublicProfile() {
    let { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(profileByIdAction(id));
    }, [dispatch, id])

    const profile = useSelector((state) => state.profilebyid);
    const { error, loading, response } = profile;

    const ProfileSkeleton = () => (
        <Fragment>
            <Stack>
                <Skeleton height={"250px"} />
                <Skeleton height={"150px"} />
                <Skeleton height={"150px"} />
                <SimpleGrid columns={2} spacing={2}>
                    <Skeleton height={"200px"} />
                    <Skeleton height={"200px"} />
                </SimpleGrid>
            </Stack>
        </Fragment>
    )

    return (
        <Fragment>
            {
                loading && (
                    <Progress size='xs' isIndeterminate />
                )
            }
            <Container maxW={"7xl"} mt={4}>
                {
                    error && (
                        <Alert status='error'>
                            <AlertIcon />
                            {error?.msg}
                        </Alert>
                    )
                }
                {
                    (loading) ? (
                        ProfileSkeleton()
                    ) : (
                        <>
                            {
                                !error && (
                                    <ProfileCard data={response} />
                                )
                            }
                        </>
                    )
                }
            </Container>
        </Fragment>
    )
}
