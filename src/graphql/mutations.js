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
export const createUserdata = /* GraphQL */ `
  mutation CreateUserdata(
    $input: CreateUserdataInput!
    $condition: ModeluserdataConditionInput
  ) {
    createUserdata(input: $input, condition: $condition) {
      id
      githubAPIKey
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateUserdata = /* GraphQL */ `
  mutation UpdateUserdata(
    $input: UpdateUserdataInput!
    $condition: ModeluserdataConditionInput
  ) {
    updateUserdata(input: $input, condition: $condition) {
      id
      githubAPIKey
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteUserdata = /* GraphQL */ `
  mutation DeleteUserdata(
    $input: DeleteUserdataInput!
    $condition: ModeluserdataConditionInput
  ) {
    deleteUserdata(input: $input, condition: $condition) {
      id
      githubAPIKey
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelprojectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
      id
      name
      githubRepo
      fileLocation
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelprojectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
      id
      name
      githubRepo
      fileLocation
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelprojectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
      id
      name
      githubRepo
      fileLocation
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
