import { Button } from "@chakra-ui/react";

export const SignInButton = ({ onClick }) => {
  return (
    <Button color="gray.800" mt={1} onClick={onClick}>
      ログイン
    </Button>
  );
};
