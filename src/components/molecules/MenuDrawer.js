import { memo, useContext } from "react";
import {
  Tag,
  Center,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import UserAttributesContext from "../../contexts/UserAttributesContext";

export const MenuDrawer = memo((props) => {
  const { name, twitterId } = useContext(UserAttributesContext);
  const {
    onClose,
    isOpen,
    onCLickHome,
    onClickSetting,
    handleLogin,
    handleLogout,
  } = props;

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Center>
              {name ? (
                <>
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
            {name ? (
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
