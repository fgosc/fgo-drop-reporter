/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReport = /* GraphQL */ `
  subscription OnCreateReport(
    $filter: ModelSubscriptionReportFilterInput
    $owner: String
  ) {
    onCreateReport(filter: $filter, owner: $owner) {
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
export const onUpdateReport = /* GraphQL */ `
  subscription OnUpdateReport(
    $filter: ModelSubscriptionReportFilterInput
    $owner: String
  ) {
    onUpdateReport(filter: $filter, owner: $owner) {
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
export const onDeleteReport = /* GraphQL */ `
  subscription OnDeleteReport(
    $filter: ModelSubscriptionReportFilterInput
    $owner: String
  ) {
    onDeleteReport(filter: $filter, owner: $owner) {
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
