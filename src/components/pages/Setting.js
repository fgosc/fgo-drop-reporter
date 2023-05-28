import { memo, useContext } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import TwitterAccount from "../molecules/TwitterAccount";
import UserAttributesContext from "../../contexts/UserAttributesContext";

export const Setting = memo(() => {
  const { cognitoId, name, email, twitterId, twitterName, twitterUsername } =
    useContext(UserAttributesContext);

  return (
    <Container maxWidth="800px" m={4}>
      <Breadcrumb m={4}>
        <BreadcrumbItem>
          <BreadcrumbLink color="teal" href="/">
            ホーム
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="teal" href={`/setting`}>
            設定
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {name ? (
        <>
          <Text>当サイトに登録されている情報です。Emailは公開されません。</Text>
          <TableContainer mt={5} mb={5}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>項目</Th>
                  <Th>内容</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>ID</Td>
                  <Td>{cognitoId}</Td>
                </Tr>
                <Tr>
                  <Td>ユーザ名</Td>
                  <Td>{name}</Td>
                </Tr>
                <Tr>
                  <Td>Email</Td>
                  <Td>{email}</Td>
                </Tr>
                <Tr>
                  <Td>Twitter ID</Td>
                  <Td>{twitterId}</Td>
                </Tr>
                <Tr>
                  <Td>Twitter 表示名</Td>
                  <Td>{twitterName}</Td>
                </Tr>
                <Tr>
                  <Td>Twitter ユーザー名</Td>
                  <Td>{twitterUsername}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <TwitterAccount />
          <Text mt={5}>
            Twitter のアカウント情報は Twitter
            と同期していません。情報を更新したい場合は、もう一度 Twitter
            連携ボタンを押して認証してください。
          </Text>
        </>
      ) : (
        <Text mt={5}>
          こんにちは、ゲストさん。設定ページの表示にはログインが必要です。
        </Text>
      )}
    </Container>
  );
});
