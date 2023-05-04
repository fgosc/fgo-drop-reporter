import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { getUserInfo } from "../../graphql/queries";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import PagenatedReportListByOwner from "./PagenatedReportListByOwner";

const configureAmplify = () => {
  Amplify.configure({
    aws_appsync_authenticationType: "API_KEY",
  });
};

const ReportsListByOwner = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [amplifyConfigured, setAmplifyConfigured] = useState(false);
  const { owner } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const username = owner;
        const result = await API.graphql(
          graphqlOperation(getUserInfo, { username })
        );
        console.log(result.data.getUserInfo);
        setUserInfo(JSON.parse(result.data.getUserInfo));
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (amplifyConfigured) {
      fetchUserInfo();
    }
  }, [amplifyConfigured]);

  useEffect(() => {
    configureAmplify();
    setAmplifyConfigured(true);
  }, []);

  return (
    <Box>
      <Heading as="h1" size="lg" m={4}>
        {userInfo?.name}の報告一覧
      </Heading>
      <Breadcrumb m={4}>
        <BreadcrumbItem>
          <BreadcrumbLink color="teal" href="/">
            ホーム
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink color="teal" href={`/owners/${owner}`}>
            {userInfo?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="teal" href={`/owners/${owner}/reports`}>
            報告一覧
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Tabs variant="enclosed-colored" colorScheme="teal" m={2}>
        <TabList>
          <Tab>全クエスト</Tab>
          <Tab>通常フリークエスト</Tab>
          <Tab>イベントフリークエスト</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PagenatedReportListByOwner />
          </TabPanel>
          <TabPanel>
            <PagenatedReportListByOwner questType="normal" />
          </TabPanel>
          <TabPanel>
            <PagenatedReportListByOwner questType="event" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ReportsListByOwner;
