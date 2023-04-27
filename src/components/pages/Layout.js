/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Link,
  useDisclosure,
  Spacer,
  Tag,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Auth } from "aws-amplify";
import { MenuIconButton } from "../atoms/button/MenuIconButton";
import { MenuDrawer } from "../molecules/MenuDrawer";
import { SignInButton } from "../atoms/button/SignInButton";
import { SignOutButton } from "../atoms/button/SignOutButton";

export const Layout = memo(() => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
        console.log(currentUser);
      } catch (error) {
        console.log("User is not authenticated:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const handleLogin = () => {
    navigate("/login");
    onClose();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickHome = useCallback(() => {
    navigate("/");
    onClose();
  }, []);
  const onClickSetting = useCallback(() => {
    navigate("/setting");
    onClose();
  }, []);

  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            FGO周回報告
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{ base: "none", md: "flex" }}
        >
          {user ? (
            <Box pr={4}>
              <Link onClick={onClickSetting}>設定</Link>
            </Box>
          ) : null}
          <Spacer />
          {user ? (
            <Box pr={4}>
              {user.attributes.name}
              {user.attributes["custom:twitter_id"] ? (
                <Tag colorScheme="twitter" ml={2}>
                  Twitter連携済み
                </Tag>
              ) : (
                <Tag colorScheme="yellow" ml={2}>
                  Twitter未連携
                </Tag>
              )}
            </Box>
          ) : null}
          {user ? (
            <SignOutButton onClick={handleLogout} />
          ) : (
            <SignInButton onClick={handleLogin} />
          )}
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        onCLickHome={onClickHome}
        onClickSetting={onClickSetting}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
      <Outlet />
    </>
  );
});
