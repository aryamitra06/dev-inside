import React, { Fragment } from 'react'
import { Container, Grid, GridItem } from "@chakra-ui/react";
import PostByIdCard from '../components/PostByIdCard';
import PostProfileOverviewCard from '../components/PostProfileOverviewCard';

export default function PostById() {
    return (
        <Fragment>
            <Container maxW={"6xl"} mt={3}>
                <Grid
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(12, 1fr)'
                    gap={5}
                >
                    <GridItem rowSpan={1} colSpan={{ base: 12, sm: 12, md: 8, lg: 8, xl: 8 }}>
                        <PostByIdCard />
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={{ base: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                        <PostProfileOverviewCard/>
                    </GridItem>
                </Grid>
            </Container>
        </Fragment>
    )
}
