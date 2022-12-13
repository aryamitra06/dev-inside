import React, { Fragment, useEffect } from 'react';
import { Container, Grid, GridItem} from '@chakra-ui/react';
import AllPosts from './AllPosts';
import { useDispatch, useSelector } from "react-redux";
import { allPostsAction } from '../redux/actions/postAction';
import {stateReseter} from "../redux/actions/utilsAction";

export default function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allPostsAction());
        dispatch(stateReseter());
    }, [dispatch])

    const postRes = useSelector((state) => state.allposts);
    return (
        <Fragment>
            <Container maxW={"7xl"} mt={3}>
                <Grid
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(12, 1fr)'
                    gap={3}
                >
                    <GridItem rowSpan={1} colSpan={3} display={{ base: "none", sm: "none", md: "none", lg: "block", xl: "block" }} />
                    <GridItem rowSpan={1} colSpan={{ base: 12, sm: 12, md: 12, lg: 6, xl: 6 }}>
                        <AllPosts postRes={postRes}/>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={3} display={{ base: "none", sm: "none", md: "none", lg: "block", xl: "block" }} />
                </Grid>
            </Container>
        </Fragment>
    )
}
