import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";

const ReportHeader = ({ report }) => {
  return (
    <>
      <Heading>{report.name || "ゲスト"}の報告</Heading>
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
          <BreadcrumbLink color="teal" href={`/reports/${report.id}`}>
            {report.id}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Text>
        ユーザー名:{" "}
        <Link href={`/owners/${report.owner}`} color="teal.500">
          {report.name}
        </Link>
      </Text>
    </>
  );
};

export default ReportHeader;
