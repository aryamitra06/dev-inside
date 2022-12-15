import React, { Fragment, useEffect } from 'react'
import { Container, Grid, GridItem } from "@chakra-ui/react";
import PostByIdCard from '../components/PostByIdCard';
import PostProfileOverviewCard from '../components/PostProfileOverviewCard';
import { useDispatch, useSelector } from "react-redux";
import { postByIdAction } from "../redux/actions/postAction";
import { profileByIdAction } from '../redux/actions/profileAction';
import { useParams } from "react-router-dom";
import { userAction } from '../redux/actions/userAction';

export default function PostById() {
    const { userid, postid } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(postByIdAction(postid))
        dispatch(profileByIdAction(userid))
        dispatch(userAction());
    }, [dispatch])
    
    
        const postRes = useSelector((state) => state.postbyid);
        const profileRes = useSelector((state) => state.profilebyid);
        const loggedInUser = useSelector((state) => state.user);

    return (
        <Fragment>
            <Container maxW={"6xl"} mt={3}>
                <Grid
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(12, 1fr)'
                    gap={5}
                >
                    <GridItem rowSpan={1} colSpan={{ base: 12, sm: 12, md: 12, lg: 8, xl: 8 }}>
                        <PostByIdCard data={postRes} loggedInUser={loggedInUser}/>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={{ base: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
                        <PostProfileOverviewCard data={profileRes}/>
                    </GridItem>
                </Grid>
            </Container>
        </Fragment>
    )
}
