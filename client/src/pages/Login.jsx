import { useState, useEffect, Fragment } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Progress
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";
import { logInAction } from '../redux/actions/authAction';
import { tokenGetter } from '../utils/tokenExtractor';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading } = useSelector((state) => state.login);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(logInAction(formData));
    }

    useEffect(() => {
        if (tokenGetter()) {
            navigate("/");
        }
        if (error) {
            toast({ title: 'Login Failed', description: error?.msg, status: 'error', duration: 3000, variant: 'left-accent', isClosable: true });
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
                    <Stack>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            Welcome back! 🎉
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" name='email' value={email} onChange={(e) => onChange(e)} isDisabled={loading} />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" name='password' value={password} onChange={(e) => onChange(e)} isDisabled={loading} />
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                {/* <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.400'}>Forgot password?</Link>
                                </Stack> */}
                                <Button
                                    isDisabled={loading}
                                    type='submit'
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign in
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>OR <Link to={"/signup"} style={{ fontWeight: "bold" }}>Create an Account</Link></Text>
                            </Stack>
                        </Stack>
                    </Box>
                    {/* {
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
                    } */}
                </Stack>
            </Flex>
        </form>
        </Fragment>
    );
}