import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import { getReport } from "../../graphql/queries";
import { deleteReport, updateReport } from "../../graphql/mutations";
import { Box, VStack, Text, Button, Center, HStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import ReportHeader from "../organisms/reports/detail/ReportHeader";
import ReportForm from "../organisms/reports/detail/ReportForm";
import ReportDeleteDialog from "../organisms/reports/detail/ReportDeleteDialog";

const configureAmplify = (cognitoId) => {
  if (cognitoId) {
    Amplify.configure({
      aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
    });
  } else {
    Amplify.configure({
      aws_appsync_authenticationType: "API_KEY",
    });
  }
};

const ReportDetails = () => {
  const [amplifyConfigured, setAmplifyConfigured] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [report, setReport] = useState(null);
  const cancelRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const [questType, setQuestType] = useState("");
  const [warName, setWarName] = useState("");
  const [questName, setQuestName] = useState("");
  const [runs, setRuns] = useState(0);
  const [note, setNote] = useState("");
  const [dropObjects, setDropObjects] = useState([]);
  const [cognitoId, setCognitoId] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await Auth.currentUserInfo();
      console.log(`userInfo: ${JSON.stringify(userInfo)}`);
      if (userInfo === null) {
        setCognitoId(null);
      } else {
        setCognitoId(userInfo.username);
      }
    };
    getUserInfo();
  }, []);

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
        setIsEditable(
          (groups && groups.includes("Admin")) ||
            (reportData.data.getReport &&
              reportData.data.getReport.owner !== null &&
              cognitoId !== null &&
              reportData.data.getReport.owner === cognitoId)
        );
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    };

    fetchReport();
  }, [amplifyConfigured, cognitoId, id]);

  useEffect(() => {
    configureAmplify(cognitoId);
    setAmplifyConfigured(true);
  }, [cognitoId]);

  useEffect(() => {
    if (report) {
      setQuestType(report.questType);
      setWarName(report.warName || "");
      setQuestName(report.questName);
      setRuns(report.runs);
      setNote(report.note);
      setDropObjects(report.dropObjects);
    }
  }, [report]);

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
      navigate("/reports/all");
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

  const handleUpdate = async () => {
    try {
      const input = {
        id: report.id,
        warName: warName === "" ? null : warName,
        questName,
        questType,
        runs,
        note,
        dropObjects,
      };
      await API.graphql(graphqlOperation(updateReport, { input }));
      console.log("Report updated");
      toast({
        title: "更新完了",
        description: "周回報告の更新が完了しました",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating report:", error);
      toast({
        title: "更新失敗",
        description: "周回報告の更新に失敗しました",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleBackClick = () => {
    navigate("/reports/all");
  };

  return (
    <Box m={8}>
      {report ? (
        <VStack spacing={1} align="start">
          <ReportHeader report={report} />
          <ReportForm
            report={report}
            questType={questType}
            setQuestType={setQuestType}
            warName={warName}
            setWarName={setWarName}
            questName={questName}
            setQuestName={setQuestName}
            runs={runs}
            setRuns={setRuns}
            note={note}
            setNote={setNote}
            dropObjects={dropObjects}
            setDropObjects={setDropObjects}
          />
          <ReportDeleteDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            cancelRef={cancelRef}
            handleDelete={handleDelete}
          />
          {isEditable && (
            <HStack mt={4}>
              <Button colorScheme="teal" onClick={handleUpdate}>
                更新
              </Button>
              <Button colorScheme="red" onClick={openDialog}>
                削除
              </Button>
            </HStack>
          )}
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
