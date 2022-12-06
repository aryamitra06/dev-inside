import { Fragment, useState, useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../redux/actions/authAction";
import { idGetter } from '../utils/tokenIdGetter';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, response } = useSelector((state) => state.signup);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpAction(formData));
  }

  useEffect(() => {
    if (idGetter()) {
      navigate("/");
    }
  }, [navigate])

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <Flex
          minH={'90vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'} textAlign={'center'}>
                Sign up to your account
              </Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                Join the biggest developer community 👩‍💻
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <FormControl id="Name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" name='name' value={name} onChange={(e) => onChange(e)} isDisabled={loading} />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name='email' value={email} onChange={(e) => onChange(e)} isDisabled={loading} />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} name='password' value={password} onChange={(e) => onChange(e)} isDisabled={loading} />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    isDisabled={loading}
                    type='submit'
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={'center'}>Already a user? <Link to={"/login"} style={{ fontWeight: "bold" }}>Login</Link></Text>
                </Stack>
              </Stack>
            </Box>
            {
              error && (
                <Alert status='error' borderRadius={"md"}>
                  <AlertIcon />
                  {error.msg}
                </Alert>
              )
            }
            {
              response && (
                <Alert status='success' borderRadius={"md"}>
                  <AlertIcon />
                  {response.msg}
                </Alert>
              )
            }
          </Stack>
        </Flex>
      </form>
    </Fragment>
  );
}