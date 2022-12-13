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
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
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

  const SearchInput = () => (
    <InputGroup>
      <InputLeftElement
        pointerEvents='none'
        children={<SearchIcon color='gray.300' />}
      />
      <Input type='text' placeholder='Search...' variant={"outline"} isDisabled={response.loading} />
    </InputGroup>
  )

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
          <Link to={"/"}><Image src={colorMode === "dark" ? logo_dark_mode : logo_light_mode} height={"65px"} /></Link>
        </HStack>
        <HStack>
          <Box display={{ base: "none", sm: "none", md: "block", lg: "block", xl: "block" }}>
            {SearchInput()}
          </Box>
          <Box display={{ base: "block", sm: "block", md: "none", lg: "none", xl: "none" }}>
            <IconButton icon={<SearchIcon />} isDisabled={response.loading} />
          </Box>
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
                        <Tag size='lg' colorScheme='blue' borderRadius='full'>
                          <Avatar
                            src={response?.response?.avatar}
                            size='xs'
                            name={response?.response?.name}
                            ml={-1}
                            mr={2}
                          />
                          <TagLabel>{response?.response?.name}</TagLabel>
                        </Tag>
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
                              <Box display={"flex"} alignItems={"center"} gap={2}>
                                {response?.response?.name}
                                <IconButton size={"md"} variant={"ghost"} colorScheme='blue' onClick={logOutHandler} display={{ base: "flex", sm: "flex", md: "none", lg: "none", xl: "none" }}><AiOutlineLogout /></IconButton>
                              </Box>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Box>
                    </Fragment>
                  )
                }
                <IconButton size={"md"} variant={"ghost"} colorScheme='blue' onClick={logOutHandler} display={{ base: "none", sm: "none", md: "flex", lg: "flex", xl: "flex" }}><AiOutlineLogout /></IconButton>
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