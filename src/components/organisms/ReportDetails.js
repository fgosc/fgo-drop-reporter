import { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  VStack,
  Heading,
  Text,
  Link,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Center,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { getReport } from "../../graphql/queries";
import { deleteReport } from "../../graphql/mutations";
import UserAttributesContext from "../../contexts/UserAttributesContext";

const ReportDetails = () => {
  const { cognitoId } = useContext(UserAttributesContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // 追加
  const [report, setReport] = useState(null);
  const cancelRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const reportData = await API.graphql(
          graphqlOperation(getReport, { id })
        );
        console.log(reportData);
        setReport(reportData.data.getReport);

        const user = await Auth.currentAuthenticatedUser();
        const groups =
          user.signInUserSession.accessToken.payload["cognito:groups"];
        setIsAdmin(groups && groups.includes("Admin"));
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    };
    console.log(cognitoId);
    if (cognitoId) {
      Amplify.configure({
        aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
      });
    } else {
      Amplify.configure({
        aws_appsync_authenticationType: "API_KEY",
      });
    }

    fetchReport();
  }, [id, cognitoId]);

  const openDialog = () => {
    setIsOpen(true);
  };

  const handleDelete = async () => {
    try {
      await API.graphql(graphqlOperation(deleteReport, { input: { id } }));
      console.log("Report deleted");
      toast({
        title: "削除完了",
        description: "周回報告の削除が完了しました",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/reports/normal");
    } catch (error) {
      console.error("Error deleting report:", error);
      toast({
        title: "削除失敗",
        description: "周回報告の削除に失敗しました",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleBackClick = () => {
    navigate("/reports/normal");
  };

  return (
    <Box m={8}>
      {report ? (
        <VStack spacing={1} align="start">
          <Heading>{report.name || "ゲスト"}</Heading>
          <Text>Twitter表示名: {report.twitterName || "N/A"}</Text>
          <Text>
            Twitter名:{" "}
            {report.twitterUsername ? (
              <Link
                href={`https://twitter.com/${report.twitterUsername}`}
                color="teal.500"
                isExternal
              >
                {report.twitterUsername}
              </Link>
            ) : (
              "N/A"
            )}
          </Text>
          <br />
          <Text>場所: {report.warName}</Text>
          <Text>クエスト名: {report.questName}</Text>
          <Text>周回数: {report.runs}</Text>
          <Text>
            報告時間: {new Date(report.timestamp * 1000).toLocaleString()}
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>アイテム名</Th>
                <Th>ドロップ数</Th>
              </Tr>
            </Thead>
            <Tbody>
              {report.dropObjects.map((dropObject, index) =>
                dropObject.drops.map((drop, idx) => (
                  <Tr key={`${index}-${idx}`}>
                    {idx === 0 && (
                      <Td rowSpan={dropObject.drops.length}>
                        {dropObject.objectName}
                        {drop.stack === null || drop.stack === 1
                          ? ""
                          : `(x${drop.stack})`}
                      </Td>
                    )}
                    <Td>{drop.num}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
          <Text>報告テキスト: {report.note}</Text>
          {((report.owner !== null &&
            cognitoId !== null &&
            report.owner === cognitoId) ||
            isAdmin) && (
            <>
              <br />
              <Button colorScheme="red" onClick={openDialog} mt={4}>
                削除
              </Button>
            </>
          )}
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={() => setIsOpen(false)}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  削除の確認
                </AlertDialogHeader>
                <AlertDialogBody>
                  本当にこのレポートを削除してもよろしいですか？削除したデータは復元できません。
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                    キャンセル
                  </Button>
                  <Button colorScheme="red" onClick={handleDelete} ml={3}>
                    削除
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </VStack>
      ) : (
        <Text>Loading...</Text>
      )}
      <Center>
        <Button onClick={handleBackClick} mt={4}>
          一覧に戻る
        </Button>
      </Center>
    </Box>
  );
};

export default ReportDetails;
