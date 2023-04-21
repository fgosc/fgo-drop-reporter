/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReport = /* GraphQL */ `
  query GetReport($id: ID!) {
    getReport(id: $id) {
      id
      owner
      name
      twitter_id
      twitter_name
      twitter_username
      type
      warName
      questName
      timestamp
      runs
      url
      memo
      dropObjects {
        objectName
        drops {
          num
          stack
        }
        bonus
        dropUpRate
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
        twitter_id
        twitter_name
        twitter_username
        type
        warName
        questName
        timestamp
        runs
        url
        memo
        dropObjects {
          objectName
          bonus
          dropUpRate
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const reportsByTypeAndTimestamp = /* GraphQL */ `
  query ReportsByTypeAndTimestamp(
    $type: String!
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reportsByTypeAndTimestamp(
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
        twitter_id
        twitter_name
        twitter_username
        type
        warName
        questName
        timestamp
        runs
        url
        memo
        dropObjects {
          objectName
          bonus
          dropUpRate
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
