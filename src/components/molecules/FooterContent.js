import { Box, HStack, Link, Spacer, Text, VStack } from "@chakra-ui/react";

function FooterContent() {
  return (
    <Box backgroundColor="gray.200" py={4} px={8}>
      <VStack spacing={2}>
        <Text fontSize="sm" textAlign="center">
          fgosc project
        </Text>
        <HStack spacing={4}>
          <Link href="/privacy-policy" fontSize="sm" color="teal.500">
            プライバシーポリシー
          </Link>
          <Link href="/contact" fontSize="sm" color="teal.500">
            お問い合わせ
          </Link>
          <Spacer />
          <Text fontSize="sm" textAlign="center">
            その他のツール:
          </Text>
          <Link
            href="https://fgosccalc.max747.org/"
            fontSize="sm"
            color="teal.500"
            isExternal
          >
            差分チェッカー(fgosccalc)
          </Link>
          <Link
            href="https://fgojunks.max747.org/fgosccnt/"
            fontSize="sm"
            color="teal.500"
            isExternal
          >
            スクショ解析(fgosccnt)
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}

export default FooterContent;
