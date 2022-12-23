import { Container, SimpleGrid, Skeleton, Stack, Alert, AlertIcon, Text } from '@chakra-ui/react'
import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import ProfileCard from '../../components/Profile/ProfileCard';
import { profileByIdAction } from '../../redux/actions/profileAction';
import ServerErrorPage from '../Error/ServerErrorPage';

export default function ViewPublicProfile() {
    let { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(profileByIdAction(id));
    }, [dispatch, id])

    const profileReducer = useSelector((state) => state.profileReducer);
    const { error, profileById, profileByIdLoading } = profileReducer;

    return (
        <Fragment>
            {error ? (<ServerErrorPage statusCode={500} />) : (
                <Container maxW={"6xl"} mt={3} minH={"72vh"}>
                    {
                        (profileByIdLoading) ? (
                            <Stack>
                                <Skeleton height={"250px"} />
                                <Skeleton height={"150px"} />
                                <Skeleton height={"150px"} />
                                <SimpleGrid columns={2} spacing={2}>
                                    <Skeleton height={"200px"} />
                                    <Skeleton height={"200px"} />
                                </SimpleGrid>
                            </Stack>
                        ) : (
                            <>
                                {profileById?.msg ?
                                    (<Alert status='info'>
                                        <AlertIcon />
                                        {profileById?.msg}
                                    </Alert>) : (
                                        <ProfileCard data={profileById} />
                                    )}
                            </>
                        )
                    }
                </Container>
            )}
        </Fragment>
    )
}
