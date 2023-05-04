import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from "@chakra-ui/react";

const Contact = () => {
  return (
    <Box>
      <Heading as="h2" size="lg" m={3}>
        お問い合わせ
      </Heading>
      <Text m={5}>お問い合わせは、以下の連絡先にお願いします。</Text>
      <UnorderedList ml={6} pl={5}>
        <ListItem>
          fgophi ＠ gmail.com (" ＠ " を"@"に変換してください)
        </ListItem>
        <ListItem>
          <Link href="https://twitter.com/fgophi" isExternal>
            twitter: @fgophi
          </Link>
        </ListItem>
      </UnorderedList>
    </Box>
  );
};

export default Contact;
