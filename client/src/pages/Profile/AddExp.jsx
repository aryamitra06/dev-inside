import React, { Fragment, useEffect } from 'react'
import { Container, Alert, AlertIcon } from "@chakra-ui/react";
import AddExpForm from '../../components/Profile/AddExpForm';
import { tokenGetter } from '../../utils/tokenExtractor';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { myProfileAction } from '../../redux/actions/profileAction';
import { isEmpty } from "../../utils/objEmptyChecker";
import ServerErrorPage from '../Error/ServerErrorPage';

export default function AddExp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileReducer = useSelector((state) => state.profileReducer);
  const { profile, error } = profileReducer;
  useEffect(() => {
    dispatch(myProfileAction());
    if (!tokenGetter()) {
      navigate("/");
    }
  }, [navigate, dispatch])

  const isProfileEmpty = isEmpty(profile || {});

  return (
    <Fragment>
      {
        error ? (<ServerErrorPage statusCode={500} />) : (
          <Container maxW={"6xl"} mt={3} minH={"72vh"}>
            {
              isProfileEmpty ? (
                <Alert status='info'>
                  <AlertIcon />
                  Create a profile before adding new experience
                </Alert>
              ) : (
                <AddExpForm />
              )
            }
          </Container>
        )
      }
    </Fragment>
  )
}
