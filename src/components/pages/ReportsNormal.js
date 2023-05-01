// src/pages/ReportsNormal.js
import { useState, useEffect, useContext } from "react";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { Link as RouterLink } from "react-router-dom";
import { listReportsSortedByTimestamp } from "../../graphql/queries";
import {
  Button,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import UserAttributesContext from "../../contexts/UserAttributesContext";

const ReportsNormal = () => {
  const { name } = useContext(UserAttributesContext);

  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // ログイン状態によって認証方式を切り替える
        if (name) {
          Amplify.configure({
            aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
          });
        } else {
          Amplify.configure({
            aws_appsync_authenticationType: "API_KEY",
          });
        }
        const reportsData = await API.graphql(
          graphqlOperation(listReportsSortedByTimestamp, {
            type: "normal",
            sortDirection: "DESC",
          })
        );
        setReports(reportsData.data.listReportsSortedByTimestamp.items);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, [name]);

  return (
    <Box m={8}>
      <Heading>通常フリークエスト</Heading>
      <Table variant="simple">
        <TableCaption>通常フリークエスト</TableCaption>
        <Thead>
          <Tr>
            <Th>名前</Th>
            <Th>時間</Th>
            <Th>場所</Th>
            <Th>クエスト名</Th>
            <Th>周回数</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {reports.map((report) => (
            <Tr key={report.id}>
              <td>{report.name || "ゲスト"}</td>
              <Td>{new Date(report.timestamp * 1000).toLocaleString()}</Td>
              <td>{report.warName}</td>
              <td>{report.questName}</td>
              <td>{report.runs}</td>
              <Td>
                <Button
                  as={RouterLink}
                  to={`/reports/${report.id}`}
                  colorScheme="teal"
                >
                  詳細
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ReportsNormal;
