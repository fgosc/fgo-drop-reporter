/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReport = /* GraphQL */ `
  query GetReport($id: ID!) {
    getReport(id: $id) {
      id
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
      owner
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
        owner
      }
      nextToken
    }
  }
`;
