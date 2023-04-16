/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateReport = /* GraphQL */ `
  mutation UpdateReport(
    $input: UpdateReportInput!
    $condition: ModelReportConditionInput
  ) {
    updateReport(input: $input, condition: $condition) {
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
export const deleteReport = /* GraphQL */ `
  mutation DeleteReport(
    $input: DeleteReportInput!
    $condition: ModelReportConditionInput
  ) {
    deleteReport(input: $input, condition: $condition) {
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
export const createReport = /* GraphQL */ `
  mutation CreateReport(
    $input: CreateReportInput!
    $condition: ModelReportConditionInput
  ) {
    createReport(input: $input, condition: $condition) {
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
