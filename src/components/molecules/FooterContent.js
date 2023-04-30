import { Box, Link, Text, VStack } from "@chakra-ui/react";

function FooterContent() {
  return (
    <Box backgroundColor="gray.200" py={4} px={8}>
      <VStack spacing={2}>
        <Text fontSize="sm" textAlign="center">
          fgosc project
        </Text>
        <Link href="/privacy-policy" fontSize="sm" color="teal.500">
          プライバシーポリシー
        </Link>
      </VStack>
    </Box>
  );
}

export default FooterContent;
