import { useEffect, useState } from "react";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { useParams, Link as RouterLink } from "react-router-dom";
import { listReportsOwnerTimestamp } from "../../graphql/queries";
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
} from "@chakra-ui/react";

const configureAmplify = () => {
  Amplify.configure({
    aws_appsync_authenticationType: "API_KEY",
  });
};

const ReportsByOwner = ({ questType }) => {
  const [reports, setReports] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [amplifyConfigured, setAmplifyConfigured] = useState(false);

  const { owner } = useParams();

  const fetchReports = async (nextToken) => {
    setLoading(true);

    try {
      const baseFilter = {};
      if (questType) {
        baseFilter.questType = { eq: questType };
      }

      const variables = {
        // type: "open",
        owner: owner + "::" + owner,
        sortDirection: "DESC",
        filter: baseFilter,
        nextToken: nextToken || undefined,
      };

      const response = await API.graphql(
        graphqlOperation(listReportsOwnerTimestamp, variables)
      );
      const { items, nextToken: newNextToken } =
        response.data.listReportsOwnerTimestamp;

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

export default ReportsByOwner;
