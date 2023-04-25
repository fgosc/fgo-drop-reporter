import { memo, useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import {
  Tag,
  Center,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";

export const MenuDrawer = memo((props) => {
  const {
    onClose,
    isOpen,
    onCLickHome,
    onClickSetting,
    handleLogin,
    handleLogout,
  } = props;
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

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Center>
              {user ? (
                <>
                  {user.attributes.name}{" "}
                  {user.attributes["custom:twitter_id"] ? (
                    <Tag colorScheme="twitter" ml={2}>
                      Twitter連携済み
                    </Tag>
                  ) : (
                    <Tag colorScheme="yellow" ml={2}>
                      Twitter未連携
                    </Tag>
                  )}
                </>
              ) : (
                <>ゲスト</>
              )}
            </Center>
            <Button w="100%" onClick={onCLickHome}>
              TOP
            </Button>
            <Button w="100%" onClick={onClickSetting}>
              設定
            </Button>
            {user ? (
              <Button w="100%" onClick={handleLogout}>
                ログアウト
              </Button>
            ) : (
              <Button w="100%" onClick={handleLogin}>
                ログイン
              </Button>
            )}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
