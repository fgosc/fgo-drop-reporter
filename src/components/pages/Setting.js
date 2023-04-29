import { memo, useState, useEffect, useContext } from "react";
import { Auth } from "aws-amplify";
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
import ReportParamContext from "../../contexts/ReportParamContext";

export const Setting = memo(() => {
  const {
    questname,
    setQuestname,
    runs,
    setRuns,
    lines,
    setLines,
    note,
    setNote,
    reportText,
    setReportText,
  } = useContext(ReportParamContext);
  console.log(questname);
  console.log(runs);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (error) {
        console.log("User is not authenticated:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {user ? (
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
                  <Td>{user?.attributes?.name}</Td>
                </Tr>
                <Tr>
                  <Td>Email</Td>
                  <Td>{user?.attributes?.email}</Td>
                </Tr>
                <Tr>
                  <Td>Twitter ID</Td>
                  <Td>{user?.attributes?.["custom:twitter_id"]}</Td>
                </Tr>
                <Tr>
                  <Td>Twitter ユーザー名</Td>
                  <Td>{user?.attributes?.["custom:twitter_username"]}</Td>
                </Tr>
                <Tr>
                  <Td>Twitter 表示名</Td>
                  <Td>{user?.attributes?.["custom:twitter_name"]}</Td>
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
