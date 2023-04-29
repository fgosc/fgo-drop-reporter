import { memo, useContext } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import TwitterAccount from "../molecules/TwitterAccount";
import UserAttributesContext from "../../contexts/UserAttributesContext";

export const Setting = memo(() => {
  const { name, email, twitterId, twitterName, twitterUsername } = useContext(
    UserAttributesContext
  );

  return (
    <>
      {name ? (
        <>
          <TableContainer>
            <Table variant="simple" size="sm">
              <TableCaption>登録内容</TableCaption>
              <Thead>
                <Tr>
                  <Th>項目</Th>
                  <Th>内容</Th>
                </Tr>
              </Thead>
              <Tbody>
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
        </>
      ) : (
        <p>こんにちは、ゲストさん。設定ページの表示にはログインが必要です。</p>
      )}
    </>
  );
});
