/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatedUserData
// ====================================================

export interface UpdatedUserData_updateUser {
  __typename: "User";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  username: string;
  name: string;
  bio: string | null;
  website: string | null;
}

export interface UpdatedUserData {
  updateUser: UpdatedUserData_updateUser;
}

export interface UpdatedUserDataVariables {
  name: string;
  bio: string;
  website: string;
}
