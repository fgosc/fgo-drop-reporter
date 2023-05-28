import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import PaginatedReportList from "./PaginatedReportList";

const NormalReportList = () => {
  return <PaginatedReportList filter={{ questType: { eq: "normal" } }} />;
};

const EventReportList = () => {
  return <PaginatedReportList filter={{ questType: { eq: "event" } }} />;
};

const UnfilteredReportList = () => {
  return <PaginatedReportList />;
};

const ReportsList = () => {
  return (
    <>
      <Breadcrumb m={4}>
        <BreadcrumbItem>
          <BreadcrumbLink color="teal" href="/">
            ホーム
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>報告</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="teal" href={`/reports/all`}>
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
            <UnfilteredReportList />
          </TabPanel>
          <TabPanel>
            <NormalReportList />
          </TabPanel>
          <TabPanel>
            <EventReportList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ReportsList;
