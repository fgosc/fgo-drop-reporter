/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useContext } from "react";
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
import UserAttributesContext from "../../contexts/UserAttributesContext";

export const Layout = memo(() => {
  const { name, twitterId } = useContext(UserAttributesContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const handleLogin = () => {
    console.log("check");
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
          {name ? (
            <Box pr={4}>
              <Link onClick={onClickSetting}>設定</Link>
            </Box>
          ) : null}
          <Spacer />
          {name ? (
            <Box pr={4}>
              {name}
              {twitterId ? (
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
          {name ? (
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
