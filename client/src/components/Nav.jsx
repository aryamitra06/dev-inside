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
  PopoverBody
} from '@chakra-ui/react';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import devinside_logo from "../static/devinside_logo.svg";
import SettingsModal from './SettingsModal';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/actions/userAction";
import { idGetter, tokenGetter } from '../utils/tokenIdGetter';

export default function Nav() {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logOutHandler = () => {
    localStorage.clear();
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
              <MenuItem><Link to={"/dashboard"}>Dashboard</Link></MenuItem>
              <MenuItem onClick={onOpen}>Settings</MenuItem>
            </MenuList>
          </Menu>
          <Link to={"/"}><Image src={devinside_logo} height={10} width={10} /></Link>
        </HStack>
        <HStack>
          <IconButton icon={<SearchIcon />} />
          {
            idGetter() ? (
              <HStack>
                {
                  response.loading ? (
                    <Skeleton height='20px' width={"100px"} />
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
                            <PopoverBody>{response?.response?.name}</PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Box>
                    </Fragment>
                  )
                }
                <Button size={"sm"} variant={"outline"} colorScheme='blue' onClick={logOutHandler}>Logout</Button>
              </HStack>
            ) : (
              <Link to={"/signup"}><Button colorScheme='blue' variant={"outline"} size={"sm"}>Create account</Button></Link>
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