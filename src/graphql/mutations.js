/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateReport = /* GraphQL */ `
  mutation UpdateReport(
    $input: UpdateReportInput!
    $condition: ModelReportConditionInput
  ) {
    updateReport(input: $input, condition: $condition) {
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
export const deleteReport = /* GraphQL */ `
  mutation DeleteReport(
    $input: DeleteReportInput!
    $condition: ModelReportConditionInput
  ) {
    deleteReport(input: $input, condition: $condition) {
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
export const createReport = /* GraphQL */ `
  mutation CreateReport(
    $input: CreateReportInput!
    $condition: ModelReportConditionInput
  ) {
    createReport(input: $input, condition: $condition) {
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
