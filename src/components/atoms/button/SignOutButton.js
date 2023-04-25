import { Button } from "@chakra-ui/react";

export const SignOutButton = ({ onClick }) => {
  return (
    <Button mt={1} onClick={onClick}>
      ログアウト
    </Button>
  );
};
