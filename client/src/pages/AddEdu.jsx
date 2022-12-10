import React, { Fragment } from 'react'
import { Container } from "@chakra-ui/react";
import AddEduForm from '../components/AddEduForm';
export default function AddEdu() {
  return (
    <Fragment>
      <Container maxW={"7xl"} mt={4}>
        <AddEduForm/>
      </Container>
    </Fragment>
  )
}
