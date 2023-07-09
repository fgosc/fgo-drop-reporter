import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import PaginatedReportList from "./PaginatedReportList";

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
      <PaginatedReportList />
    </>
  );
};

export default ReportsList;
