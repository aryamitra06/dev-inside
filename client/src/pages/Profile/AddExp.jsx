import React, { Fragment, useEffect } from 'react'
import { Container } from "@chakra-ui/react";
import AddExpForm from '../../components/Profile/AddExpForm';
import { tokenGetter } from '../../utils/tokenExtractor';
import { useNavigate } from 'react-router-dom';
export default function AddExp() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenGetter()) {
      navigate("/");
    }
  }, [navigate])

  return (
    <Fragment>
      <Container maxW={"6xl"} mt={3} minH={"72vh"}>
        <AddExpForm />
      </Container>
    </Fragment>
  )
}
