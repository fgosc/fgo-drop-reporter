import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Link,
} from "@chakra-ui/react";
import { listReportsSortedByTimestamp } from "../../graphql/queries";

const configureAmplify = () => {
  Amplify.configure({
    aws_appsync_authenticationType: "API_KEY",
  });
};

const PaginatedReportList = ({ filter }) => {
  const [reports, setReports] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [amplifyConfigured, setAmplifyConfigured] = useState(false);

  const fetchReports = async (nextToken) => {
    setLoading(true);

    try {
      const variables = {
        type: "open",
        sortDirection: "DESC",
        filter: filter || {},
        nextToken: nextToken || undefined,
      };

      const response = await API.graphql(
        graphqlOperation(listReportsSortedByTimestamp, variables)
      );
      const { items, nextToken: newNextToken } =
        response.data.listReportsSortedByTimestamp;

      if (items.length === 0) {
        setNextToken(null);
      } else {
        setReports((prev) => [...prev, ...items]);
        setNextToken(newNextToken);
      }
      setHasFetched(true);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchReports(nextToken);
  };

  useEffect(() => {
    if (!hasFetched && amplifyConfigured) {
      setReports([]);
      fetchReports();
    }
  }, [hasFetched, amplifyConfigured]);

  useEffect(() => {
    configureAmplify();
    setAmplifyConfigured(true);
  }, []);

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>投稿者名</Th>
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
              <Td>
                {report.name ? (
                  <Link href={`/owners/${report.owner}/reports`} color="teal">
                    {report.name}
                  </Link>
                ) : (
                  "ゲスト"
                )}
              </Td>
              <Td>{new Date(report.timestamp * 1000).toLocaleString()}</Td>
              <Td>{report.warName}</Td>
              <Td>{report.questName}</Td>
              <Td>{report.runs}</Td>
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
      {nextToken && (
        <VStack>
          <Button onClick={handleLoadMore} mt={4} isLoading={loading}>
            続き
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default PaginatedReportList;
