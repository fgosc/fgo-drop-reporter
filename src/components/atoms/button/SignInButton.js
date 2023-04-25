import { Button } from "@chakra-ui/react";

export const SignInButton = ({ onClick }) => {
  return (
    <Button mt={1} onClick={onClick}>
      ログイン
    </Button>
  );
};
