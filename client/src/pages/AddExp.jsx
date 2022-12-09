import React, { Fragment } from 'react'
import { Container } from "@chakra-ui/react";
import AddExpForm from '../components/AddExpForm';
export default function AddExp() {
  return (
    <Fragment>
      <Container maxW={"7xl"} mt={4}>
        <AddExpForm/>
      </Container>
    </Fragment>
  )
}
