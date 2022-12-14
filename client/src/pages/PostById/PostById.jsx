import React, { Fragment, useEffect } from 'react'
import { Container, Grid, GridItem } from "@chakra-ui/react";
import PostByIdCard from '../../components/PostById/PostByIdCard';
import PostProfileOverviewCard from '../../components/PostById/PostProfileOverviewCard';
import { useDispatch, useSelector } from "react-redux";
import { postByIdAction } from "../../redux/actions/postAction";
import { profileByIdAction } from '../../redux/actions/profileAction';
import { useParams } from "react-router-dom";
import ServerErrorPage from "../Error/ServerErrorPage";

export default function PostById() {
    const { userid, postid } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(postByIdAction(postid))
        dispatch(profileByIdAction(userid))
    }, [dispatch, postid, userid])


    const postReducer = useSelector((state) => state.postReducer);
    const profileReducer = useSelector((state) => state.profileReducer);

    return (
        <Fragment>
            {
                (postReducer?.error || profileReducer?.error) ? (<ServerErrorPage statusCode={500} />) : (
                    <Container maxW={"6xl"} mt={3} minH={"72vh"}>
                        <Grid
                            templateRows='repeat(1, 1fr)'
                            templateColumns='repeat(12, 1fr)'
                            gap={5}
                        >
                            <GridItem rowSpan={1} colSpan={{ base: 12, sm: 12, md: 12, lg: 8, xl: 8 }}>
                                <PostByIdCard postReducer={postReducer} />
                            </GridItem>
                            <GridItem rowSpan={1} colSpan={{ base: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
                                <PostProfileOverviewCard profileReducer={profileReducer} />
                            </GridItem>
                        </Grid>
                    </Container>
                )
            }
        </Fragment>
    )
}
