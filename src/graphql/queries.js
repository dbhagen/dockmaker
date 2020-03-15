/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncElements = /* GraphQL */ `
  query SyncElements(
    $filter: ModelelementsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncElements(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        content
        price
        rating
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getElements = /* GraphQL */ `
  query GetElements($id: ID!) {
    getElements(id: $id) {
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
export const listElementss = /* GraphQL */ `
  query ListElementss(
    $filter: ModelelementsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listElementss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        price
        rating
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUserdata = /* GraphQL */ `
  query SyncUserdata(
    $filter: ModeluserdataFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserdata(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        githubAPIKey
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getUserdata = /* GraphQL */ `
  query GetUserdata($id: ID!) {
    getUserdata(id: $id) {
      id
      githubAPIKey
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listUserdatas = /* GraphQL */ `
  query ListUserdatas(
    $filter: ModeluserdataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserdatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        githubAPIKey
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncProjects = /* GraphQL */ `
  query SyncProjects(
    $filter: ModelprojectFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProjects(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        githubRepo
        fileLocation
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
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
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelprojectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        githubRepo
        fileLocation
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
