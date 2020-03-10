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
