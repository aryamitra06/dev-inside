import React, { Fragment, useEffect } from 'react'
import { Container, Grid, GridItem } from "@chakra-ui/react";
import PostByIdCard from '../../components/PostById/PostByIdCard';
import PostProfileOverviewCard from '../../components/PostById/PostProfileOverviewCard';
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


    const postReducer = useSelector((state) => state.postReducer);
    const profileRes = useSelector((state) => state.profilebyid);

    return (
        <Fragment>
            <Container maxW={"6xl"} mt={3} minH={"80vh"}>
                <Grid
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(12, 1fr)'
                    gap={5}
                >
                    <GridItem rowSpan={1} colSpan={{ base: 12, sm: 12, md: 12, lg: 8, xl: 8 }}>
                        <PostByIdCard postReducer = {postReducer} />
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={{ base: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
                        <PostProfileOverviewCard data={profileRes} />
                    </GridItem>
                </Grid>
            </Container>
        </Fragment>
    )
}
