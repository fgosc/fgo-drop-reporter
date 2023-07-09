/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReport = /* GraphQL */ `
  query GetReport($id: ID!) {
    getReport(id: $id) {
      id
      owner
      name
      twitterId
      twitterName
      twitterUsername
      type
      warName
      questName
      questType
      timestamp
      runs
      note
      dropObjects {
        objectName
        drops {
          num
          stack
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const listReports = /* GraphQL */ `
  query ListReports(
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        name
        twitterId
        twitterName
        twitterUsername
        type
        warName
        questName
        questType
        timestamp
        runs
        note
        dropObjects {
          objectName
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listReportsOwnerTimestamp = /* GraphQL */ `
  query ListReportsOwnerTimestamp(
    $owner: String!
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportsOwnerTimestamp(
      owner: $owner
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        name
        twitterId
        twitterName
        twitterUsername
        type
        warName
        questName
        questType
        timestamp
        runs
        note
        dropObjects {
          objectName
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listReportsSortedByTimestamp = /* GraphQL */ `
  query ListReportsSortedByTimestamp(
    $type: String!
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportsSortedByTimestamp(
      type: $type
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        name
        twitterId
        twitterName
        twitterUsername
        type
        warName
        questName
        questType
        timestamp
        runs
        note
        dropObjects {
          objectName
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserInfo = /* GraphQL */ `
  query GetUserInfo($username: String!) {
    getUserInfo(username: $username)
  }
`;
