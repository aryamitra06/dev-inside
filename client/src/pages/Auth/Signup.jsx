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
  Select,
  Progress
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../../redux/actions/authAction";
import { idGetter } from '../../utils/tokenExtractor';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.signup);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    password: ""
  });
  const { name, email, gender, password } = formData;

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
    if (error) {
      toast({ title: 'Signup Failed', description: error?.msg, status: 'error', duration: 3000, variant: 'left-accent', isClosable: true });
    }
  }, [navigate, error, toast])

  return (
    <Fragment>
      {
        loading && (
          <Progress size='xs' isIndeterminate />
        )
      }
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
              <Text fontSize={'lg'} color={'gray.300'}>
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
                <FormControl id="gender" isRequired>
                  <FormLabel>Gender</FormLabel>
                  <Select placeholder='Select option' name='gender' value={gender} onChange={(e) => onChange(e)} isDisabled={loading}>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </Select>
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
          </Stack>
        </Flex>
      </form>
    </Fragment>
  );
}