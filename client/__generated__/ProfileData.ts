/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfileData
// ====================================================

export interface ProfileData_getOneByUserId_followers {
  __typename: "Follow";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
}

export interface ProfileData_getOneByUserId_following {
  __typename: "Follow";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
}

export interface ProfileData_getOneByUserId {
  __typename: "User";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  name: string;
  username: string;
  bio: string | null;
  website: string | null;
  createdAt: FwitterDateTime;
  followers: ProfileData_getOneByUserId_followers[];
  following: ProfileData_getOneByUserId_following[];
}

export interface ProfileData {
  getOneByUserId: ProfileData_getOneByUserId;
}

export interface ProfileDataVariables {
  userId: string;
}
