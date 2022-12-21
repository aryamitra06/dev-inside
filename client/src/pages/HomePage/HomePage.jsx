import React, { Fragment, useEffect } from 'react';
import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";
import { allPostsAction } from '../../redux/actions/postAction';
import AllPosts from '../../components/HomePage/AllPosts';
import NewPostCard from '../../components/HomePage/NewPostCard';
import AllProfilesCard from '../../components/HomePage/AllProfilesCard';
import { allProfilesAction } from '../../redux/actions/profileAction';

export default function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allPostsAction());
        dispatch(allProfilesAction());
    }, [dispatch])

    const postReducer = useSelector((state) => state.postReducer);
    const allProfilesReducer = useSelector((state) => state.allprofiles);
    return (
        <Fragment>
            <Container maxW={"6xl"} mt={3} minH={"80vh"}>
                <Grid
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(12, 1fr)'
                    gap={3}
                >
                    <GridItem rowSpan={1} colSpan={{ base: 12, sm: 12, md: 12, lg: 8, xl: 8 }}>
                        <NewPostCard />
                        <Box mb={{ base: 0, sm: 0, md: 0, lg: 3, xl: 3 }}>
                            <AllPosts postReducer={postReducer} />
                        </Box>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={{ base: 12, sm: 12, md: 12, lg: 4, xl: 4 }} display={{ base: "block", sm: "block", md: "block", lg: "block", xl: "block" }}>
                        <Box mb={{ base: 4, sm: 4, md: 4, lg: 0, xl: 0 }}>
                            <AllProfilesCard allProfilesReducer={allProfilesReducer}/>
                        </Box>
                    </GridItem>
                </Grid>
            </Container>
        </Fragment>
    )
}
