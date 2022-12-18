import { Fragment } from 'react';
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
import logo_dark_mode from "../../static/logo_dark_mode.svg";
import logo_light_mode from "../../static/logo_light_mode.svg";
import SettingsModal from './SettingsModal';
import { Link } from 'react-router-dom';
import { idGetter, tokenGetter, nameGetter, avatarGetter } from '../../utils/tokenExtractor';
import {BiNews} from "react-icons/bi";
import { AiOutlineLogout, AiFillEye, AiFillSetting } from "react-icons/ai";
import { MdOutlineAutoGraph } from "react-icons/md";

export default function Nav() {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logOutHandler = () => {
    localStorage.removeItem('token');
    window.location.href = "/login";
  }

  console.log(avatarGetter());
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
              <Link to={"/"}><MenuItem icon={<BiNews />}>Feed</MenuItem></Link>
              {tokenGetter() && <Link to={`/profile/${idGetter()}`}><MenuItem icon={<AiFillEye />}>My Public Profile</MenuItem></Link>}
              {tokenGetter() && <Link to={"/dashboard"}><MenuItem icon={<MdOutlineAutoGraph />}>Dashboard</MenuItem></Link>}
              <MenuItem onClick={onOpen} icon={<AiFillSetting />}>Settings</MenuItem>
            </MenuList>
          </Menu>
          <Link to={"/"}><Image src={colorMode === "dark" ? logo_dark_mode : logo_light_mode} height={{ base: "50px", sm: "50px", md: "65px", lg: "65px", xl: "65px" }} /></Link>
        </HStack>
        <HStack>
          {
            idGetter() ? (
              <HStack>
                <Box display={{ base: "none", sm: "none", md: "block", lg: "block", xl: "block" }}>
                  <Popover>
                    <PopoverTrigger>
                      <Tag size='lg' colorScheme='blue' borderRadius='full' cursor={"pointer"}>
                        <Avatar
                          src={avatarGetter()}
                          size='xs'
                          name={nameGetter()}
                          ml={-1}
                          mr={2}
                        />
                        <TagLabel>{nameGetter()}</TagLabel>
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
                        src={avatarGetter()}
                        size='sm'
                        name={nameGetter()}
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
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} position={"sticky"} top={0} zIndex={1}>
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