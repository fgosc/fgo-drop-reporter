import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { getUserInfo } from "../../graphql/queries";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  ListItem,
  UnorderedList,
  Link,
} from "@chakra-ui/react";

const configureAmplify = () => {
  Amplify.configure({
    aws_appsync_authenticationType: "API_KEY",
  });
};

const OwnerInfo = () => {
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
    <Container maxWidth="800px" m={4}>
      <Breadcrumb m={4}>
        <BreadcrumbItem>
          <BreadcrumbLink color="teal" href="/">
            ホーム
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>ユーザー</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="teal" href={`/owners/${owner}`}>
            {userInfo?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <TableContainer mt={5} mb={5}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>項目</Th>
              <Th>内容</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>ID</Td>
              <Td>{owner}</Td>
            </Tr>
            <Tr>
              <Td>ユーザ名</Td>
              <Td>{userInfo?.name}</Td>
            </Tr>
            <Tr>
              <Td>Twitter ID</Td>
              <Td>{userInfo?.twitterId}</Td>
            </Tr>
            <Tr>
              <Td>Twitter 表示名</Td>
              <Td>{userInfo?.twitterName}</Td>
            </Tr>
            <Tr>
              <Td>Twitter ユーザー名</Td>
              <Td>
                <Link
                  href={`https://twitter.com/${userInfo?.twitterUsername}`}
                  color="teal.500"
                  isExternal
                >
                  {userInfo?.twitterUsername}
                </Link>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <UnorderedList ml={6} pl={5}>
        <ListItem>
          <Link color="teal" href={`/owners/${owner}/reports`}>
            報告一覧
          </Link>
        </ListItem>
      </UnorderedList>
    </Container>
  );
};

export default OwnerInfo;
