/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProfileFeed
// ====================================================

export interface GetProfileFeed_getProfileFeed_user {
  __typename: "User";
  username: string;
}

export interface GetProfileFeed_getProfileFeed {
  __typename: "Tweet";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  text: string;
  createdAt: FwitterDateTime;
  user: GetProfileFeed_getProfileFeed_user | null;
}

export interface GetProfileFeed {
  getProfileFeed: GetProfileFeed_getProfileFeed[];
}

export interface GetProfileFeedVariables {
  userId: string;
}
