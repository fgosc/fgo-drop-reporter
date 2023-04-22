import { Button } from "@chakra-ui/react";

function SignOutButton({ onClick }) {
  return (
    <Button mt={1} onClick={onClick}>
      Sign out
    </Button>
  );
}

export default SignOutButton;
