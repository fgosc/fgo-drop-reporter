/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReport = /* GraphQL */ `
  subscription OnCreateReport(
    $filter: ModelSubscriptionReportFilterInput
    $owner: String
  ) {
    onCreateReport(filter: $filter, owner: $owner) {
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
export const onUpdateReport = /* GraphQL */ `
  subscription OnUpdateReport(
    $filter: ModelSubscriptionReportFilterInput
    $owner: String
  ) {
    onUpdateReport(filter: $filter, owner: $owner) {
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
export const onDeleteReport = /* GraphQL */ `
  subscription OnDeleteReport(
    $filter: ModelSubscriptionReportFilterInput
    $owner: String
  ) {
    onDeleteReport(filter: $filter, owner: $owner) {
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
