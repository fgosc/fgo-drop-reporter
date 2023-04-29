import { Button } from "@chakra-ui/react";

export const SignOutButton = ({ onClick }) => {
  return (
    <Button color="gray.800" mt={1} onClick={onClick}>
      ログアウト
    </Button>
  );
};
