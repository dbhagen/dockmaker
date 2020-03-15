/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateElements = /* GraphQL */ `
  subscription OnCreateElements {
    onCreateElements {
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
export const onUpdateElements = /* GraphQL */ `
  subscription OnUpdateElements {
    onUpdateElements {
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
export const onDeleteElements = /* GraphQL */ `
  subscription OnDeleteElements {
    onDeleteElements {
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
export const onCreateUserdata = /* GraphQL */ `
  subscription OnCreateUserdata($owner: String) {
    onCreateUserdata(owner: $owner) {
      id
      githubAPIKey
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateUserdata = /* GraphQL */ `
  subscription OnUpdateUserdata($owner: String) {
    onUpdateUserdata(owner: $owner) {
      id
      githubAPIKey
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteUserdata = /* GraphQL */ `
  subscription OnDeleteUserdata($owner: String) {
    onDeleteUserdata(owner: $owner) {
      id
      githubAPIKey
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject($owner: String) {
    onCreateProject(owner: $owner) {
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
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject($owner: String) {
    onUpdateProject(owner: $owner) {
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
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject($owner: String) {
    onDeleteProject(owner: $owner) {
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
