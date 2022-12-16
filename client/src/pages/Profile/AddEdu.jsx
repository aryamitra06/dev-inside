import React, { Fragment, useEffect } from 'react'
import { Container } from "@chakra-ui/react";
import AddEduForm from '../../components/Profile/AddEduForm';
import { useNavigate } from 'react-router-dom';
import { tokenGetter } from '../../utils/tokenExtractor';
export default function AddEdu() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenGetter()) {
      navigate("/");
    }
  }, [navigate])

  return (
    <Fragment>
      <Container maxW={"7xl"} mt={4}>
        <AddEduForm />
      </Container>
    </Fragment>
  )
}