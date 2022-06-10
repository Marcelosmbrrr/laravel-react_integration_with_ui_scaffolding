import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
// Hook for use the custom Context
import { useAuth } from '../../context/Auth';
// Custom
import { UserInterface } from '../../structures/User/UserInterface';
import { AdminInterface } from '../../structures/Admin/AdminInterface';

export function Layout({...props}) {

  const {auth, setAuth} = useAuth();

  function logout(){
    setAuth(null);
    window.location.href = "/logout";
  }

  return (
    <>
      <Box sx={{display: "flex", flexDirection: "column"}}>

        <Box bg={"#2C7A7B"} px={4} className = "header">
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Box><b>LARAV-REACT</b></Box>
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7}>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                      size={'sm'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <br />
                    <Center>
                      <Avatar
                        size={'2xl'}
                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{auth.information.username}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        </Box>

          {UserInterface()}
       

      </Box>

      
    </>
  );
}