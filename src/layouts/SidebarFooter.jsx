import {
  Box,
  Flex,
  Text,
  Button,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {authActions} from "../store/auth/auth.slice";
import styles from "./AdminLayout.module.scss";
import React, {useState, useRef, useEffect} from "react";

const SidebarFooter = ({sidebarOpen = true}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    navigate("/login", {replace: true});
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };

    if (isSettingsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSettingsOpen]);

  return (
    <div className={styles.sidebarFooter}>
      {sidebarOpen ? (
        <>
          <Box ref={settingsRef} position="relative" zIndex={99999}>
            <Menu
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              placement="right-start">
              <Button
                variant="ghost"
                p={"8px 12px"}
                h={"40px"}
                mb={"16px"}
                cursor={"pointer"}
                borderRadius={"6px"}
                bg="transparent"
                _hover={{bg: "rgba(255, 255, 255, 0.1)"}}
                _active={{bg: "rgba(255, 255, 255, 0.1)"}}
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                gap="8px"
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="flex-start">
                <img src="/img/setting.svg" alt="" width="20" height="20" />
                <Text fontSize={"16px"} fontWeight={"600"} color={"#CECFD2"}>
                  Settings
                </Text>
              </Button>
              <MenuList
                bg="#1a1a1a"
                border="1px solid #333"
                borderRadius="8px"
                minW="200px"
                zIndex={99999}
                position="absolute"
                left="250px"
                top="0"
                mt="0">
                <MenuItem
                  onClick={handleLogout}
                  bg="transparent"
                  _hover={{bg: "rgba(255, 255, 255, 0.1)"}}
                  color="#ef4444"
                  icon={
                    <Box w="16px" h="16px" fontSize="12px" fontWeight="bold">
                      L
                    </Box>
                  }>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Flex
            position={"relative"}
            bg={"#12161C"}
            alignItems={"center"}
            gap={"8px"}
            borderRadius={"12px"}
            border={"1px solid #22262F"}
            p={"8px 12px"}
            h={"64px"}>
            <Box
              cursor={"pointer"}
              position={"absolute"}
              right={"12px"}
              top={"12px"}>
              <img src="/img/chevron.svg" alt="" />
            </Box>
            <Box
              w={"40px"}
              h={"40px"}
              bg={"#22262F"}
              borderRadius={"50%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              color={"#94979C"}
              fontWeight={"600"}
              fontSize={"16px"}>
              J
            </Box>
            <Flex flexDirection={"column"} gap={"0px"}>
              <Text fontSize={"14px"} fontWeight={"600"} color={"#fff"}>
                Javlon
              </Text>
              <Text fontSize={"14px"} fontWeight={"400"} color={"#94979C"}>
                javlon@lodify.com
              </Text>
            </Flex>
          </Flex>
        </>
      ) : (
        <>
          <Box ref={settingsRef} position="relative" mb="8px" zIndex={99999}>
            <Menu
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              placement="right-start">
              <Tooltip label="Settings" placement="right" hasArrow>
                <Button
                  as={Button}
                  variant="ghost"
                  alignItems={"center"}
                  justifyContent={"center"}
                  p={"8px"}
                  borderRadius={"8px"}
                  _hover={{bg: "rgba(255, 255, 255, 0.1)"}}
                  _active={{bg: "rgba(255, 255, 255, 0.1)"}}
                  cursor={"pointer"}
                  w={"48px"}
                  h={"48px"}
                  bg="transparent"
                  className={styles.footerIconButton}
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
                  <img src="/img/setting.svg" alt="Settings" />
                </Button>
              </Tooltip>
              <MenuList
                bg="#1a1a1a"
                border="1px solid #333"
                borderRadius="8px"
                minW="150px"
                zIndex={99999}
                position="absolute"
                left="100%"
                top="0"
                mt="0">
                <MenuItem
                  onClick={handleLogout}
                  bg="transparent"
                  _hover={{bg: "rgba(255, 255, 255, 0.1)"}}
                  color="#ef4444"
                  icon={
                    <Box w="16px" h="16px" fontSize="12px" fontWeight="bold">
                      L
                    </Box>
                  }>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <Tooltip label="Profile" placement="right" hasArrow>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              bg={"#12161C"}
              borderRadius={"8px"}
              border={"1px solid #22262F"}
              p={"8px"}
              h={"48px"}
              w={"48px"}
              className={styles.footerIconButton}
              cursor={"pointer"}>
              <Box
                w={"24px"}
                h={"24px"}
                bg={"#22262F"}
                borderRadius={"50%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                color={"#94979C"}
                fontWeight={"600"}
                fontSize={"12px"}>
                J
              </Box>
            </Flex>
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default SidebarFooter;
