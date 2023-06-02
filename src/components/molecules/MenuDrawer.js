import { memo, useContext } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import UserAttributesContext from "../../contexts/UserAttributesContext";

export const MenuDrawer = memo((props) => {
  const { name } = useContext(UserAttributesContext);
  const {
    onClose,
    isOpen,
    onCLickHome,
    onClickReport,
    onClickSetting,
    onClickDocumentation,
    handleLogin,
    handleLogout,
  } = props;

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button w="100%" onClick={onCLickHome}>
              TOP
            </Button>
            <Button w="100%" onClick={onClickReport}>
              報告一覧
            </Button>
            {name ? (
              <Button w="100%" onClick={onClickSetting}>
                設定
              </Button>
            ) : null}
            <Button w="100%" onClick={onClickDocumentation}>
              当サイトの利用法
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
