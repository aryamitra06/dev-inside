import { ReactNode } from 'react';
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
} from '@chakra-ui/react';
import { HamburgerIcon, SearchIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import devinside_logo from "../static/devinside_logo.svg";
import SettingsModal from './SettingsModal';
export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <MenuItem>Developers</MenuItem>
              <MenuItem onClick={onOpen}>Settings</MenuItem>
            </MenuList>
          </Menu>
          <Image src={devinside_logo} height={10} width={10} />
        </HStack>
        <HStack>
          <IconButton icon={<SearchIcon />} />
          <Button colorScheme='blue' variant={"outline"} size={"sm"}>Create account</Button>
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