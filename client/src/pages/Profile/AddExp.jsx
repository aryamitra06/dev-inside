import React, { Fragment, useEffect } from 'react'
import { Container } from "@chakra-ui/react";
import AddExpForm from '../../components/Profile/AddExpForm';
import { tokenGetter } from '../../utils/tokenExtractor';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { myProfileAction } from '../../redux/actions/profileAction';
export default function AddExp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileReducer = useSelector((state) => state.profileReducer);
  const { profile, error } = profileReducer;
  console.log(profile);
  useEffect(() => {
    dispatch(myProfileAction());
    if (!tokenGetter()) {
      navigate("/");
    }
    //if profile is created then navigate to homepage
    else if (profile?.msg) {
      navigate("/");
    }
  }, [navigate, dispatch, profile?.msg])

  return (
    <Fragment>
      <Container maxW={"6xl"} mt={3} minH={"72vh"}>
        <AddExpForm />
      </Container>
    </Fragment>
  )
}
