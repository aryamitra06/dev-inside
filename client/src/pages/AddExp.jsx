import React, { Fragment, useEffect } from 'react'
import { Container } from "@chakra-ui/react";
import AddExpForm from '../components/AddExpForm';
import { tokenGetter } from '../utils/tokenIdGetter';
import { useNavigate } from 'react-router-dom';
export default function AddExp() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenGetter()) {
      navigate("/");
    }
  }, [])

  return (
    <Fragment>
      <Container maxW={"7xl"} mt={4}>
        <AddExpForm />
      </Container>
    </Fragment>
  )
}
