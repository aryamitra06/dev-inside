import { Fragment, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Container,
  Avatar,
  Skeleton,
  Tag,
  TagLabel,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  useColorMode,
  Card,
  CardBody
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import logo_dark_mode from "../static/logo_dark_mode.svg";
import logo_light_mode from "../static/logo_light_mode.svg";
import SettingsModal from './SettingsModal';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/actions/userAction";
import { idGetter, tokenGetter } from '../utils/tokenIdGetter';
import { AiOutlineLogout } from "react-icons/ai";

export default function Nav() {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logOutHandler = () => {
    localStorage.removeItem('token');
    window.location.href = "/login";
  }

  useEffect(() => {
    dispatch(userAction(tokenGetter()));
  }, [dispatch])

  const response = useSelector((state) => state.user);

  const Navbar = () => {
    return (
      <Flex h={14} alignItems={'center'} justifyContent={'space-between'}>
        <HStack>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
              {tokenGetter() && <Link to={`/profile/${idGetter()}`}><MenuItem>My Profile</MenuItem></Link>}
              {tokenGetter() && <Link to={"/dashboard"}><MenuItem>Dashboard</MenuItem></Link>}
              <MenuItem onClick={onOpen}>Settings</MenuItem>
            </MenuList>
          </Menu>
          <Link to={"/"}><Image src={colorMode === "dark" ? logo_dark_mode : logo_light_mode} height={{base: "50px", sm: "50px", md: "65px", lg: "65px", xl: "65px"}} /></Link>
        </HStack>
        <HStack>
          {tokenGetter() && <Link to={"/new"}><Button variant={"solid"} colorScheme={"blue"} size={"sm"} isDisabled={response.loading}>Create Post</Button></Link>}
          {
            idGetter() ? (
              <HStack>
                {
                  response.loading ? (
                    <>
                      <Skeleton height='35px' width={"200px"} display={{ base: "none", sm: "none", md: "block", lg: "block", xl: "block" }} />
                      <Skeleton height='35px' width={"35px"} display={{ base: "block", sm: "block", md: "none", lg: "none", xl: "none" }} borderRadius={"100%"} />
                    </>
                  ) : (
                    <Fragment>
                      <Box display={{ base: "none", sm: "none", md: "block", lg: "block", xl: "block" }}>
                        <Popover>
                          <PopoverTrigger>
                            <Tag size='lg' colorScheme='blue' borderRadius='full' cursor={"pointer"}>
                              <Avatar
                                src={response?.response?.avatar}
                                size='xs'
                                name={response?.response?.name}
                                ml={-1}
                                mr={2}
                              />
                              <TagLabel>{response?.response?.name}</TagLabel>
                            </Tag>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                              <Card variant={"filled"}>
                                <CardBody>
                                  <Button leftIcon={<AiOutlineLogout />} colorScheme='blue' onClick={logOutHandler} w={"100%"}>Logout</Button>
                                </CardBody>
                              </Card>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Box>
                      <Box display={{ base: "block", sm: "block", md: "none", lg: "none", xl: "none" }}>
                        <Popover>
                          <PopoverTrigger>
                            <Avatar
                              src={response?.response?.avatar}
                              size='sm'
                              name={response?.response?.name}
                              ml={-1}
                              mr={2}
                            />
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                            <Card variant={"filled"}>
                                <CardBody>
                                  <Button leftIcon={<AiOutlineLogout />} colorScheme='blue' onClick={logOutHandler} w={"100%"}>Logout</Button>
                                </CardBody>
                              </Card>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Box>
                    </Fragment>
                  )
                }
              </HStack>
            ) : (
              <>
                <Link to={"/login"}><Button colorScheme='blue' variant={"outline"} size={"sm"}>Login</Button></Link>
              </>
            )
          }
        </HStack>
      </Flex>
    )
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Container maxW={{ sm: "7xl", md: "7xl", lg: "7xl", xl: "7xl" }} display={{ base: "none", sm: "block", md: "block", lg: "block", xl: "block" }}>
          {Navbar()}
        </Container>
        <Box display={{ base: "block", sm: "none", md: "none", lg: "none", xl: "none" }}>
          {Navbar()}
        </Box>
      </Box>
      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}