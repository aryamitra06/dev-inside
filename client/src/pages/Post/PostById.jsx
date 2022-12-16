import React, { Fragment, useEffect } from 'react'
import { Container, Grid, GridItem, Progress } from "@chakra-ui/react";
import PostByIdCard from '../../components/Post/PostByIdCard';
import PostProfileOverviewCard from '../../components/Post/PostProfileOverviewCard';
import { useDispatch, useSelector } from "react-redux";
import { postByIdAction } from "../../redux/actions/postAction";
import { profileByIdAction } from '../../redux/actions/profileAction';
import { useParams } from "react-router-dom";

export default function PostById() {
    const { userid, postid } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(postByIdAction(postid))
        dispatch(profileByIdAction(userid))
    }, [dispatch, postid, userid])


    const postRes = useSelector((state) => state.postbyid);
    const profileRes = useSelector((state) => state.profilebyid);

    return (
        <Fragment>
            {
                (postRes?.loading || profileRes?.loading) && (
                    <Progress size='xs' isIndeterminate />
                )
            }
            <Container maxW={"6xl"} mt={3}>
                <Grid
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(12, 1fr)'
                    gap={5}
                >
                    <GridItem rowSpan={1} colSpan={{ base: 12, sm: 12, md: 12, lg: 8, xl: 8 }}>
                        <PostByIdCard data={postRes} />
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={{ base: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
                        <PostProfileOverviewCard data={profileRes} />
                    </GridItem>
                </Grid>
            </Container>
        </Fragment>
    )
}