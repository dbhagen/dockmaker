/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createElements = /* GraphQL */ `
  mutation CreateElements(
    $input: CreateElementsInput!
    $condition: ModelelementsConditionInput
  ) {
    createElements(input: $input, condition: $condition) {
      id
      title
      content
      price
      rating
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateElements = /* GraphQL */ `
  mutation UpdateElements(
    $input: UpdateElementsInput!
    $condition: ModelelementsConditionInput
  ) {
    updateElements(input: $input, condition: $condition) {
      id
      title
      content
      price
      rating
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteElements = /* GraphQL */ `
  mutation DeleteElements(
    $input: DeleteElementsInput!
    $condition: ModelelementsConditionInput
  ) {
    deleteElements(input: $input, condition: $condition) {
      id
      title
      content
      price
      rating
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
