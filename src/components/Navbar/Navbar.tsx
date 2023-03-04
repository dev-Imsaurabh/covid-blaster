import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
  HStack,
  Image,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FILL_PARENT, FIXED } from '../../constants/constants';
import { useLocation } from 'react-router-dom';
import enemy from "../../scripts/enemy.png"



export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let location = useLocation()
  
  if (location.pathname === '/play') {
    return null;
  }
  return (
    <>
      <Box zIndex={1000} position={FIXED} top={0} w={FILL_PARENT} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack>
            <Image padding={2} src={enemy} width={"100px"}></Image>
            <Heading><span style={{color:"#ec38bc"}}>Covid</span>Blaster</Heading>
            </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              {/* <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button> */}

            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}