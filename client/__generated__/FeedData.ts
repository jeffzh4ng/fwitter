/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FeedData
// ====================================================

export interface FeedData_getFeed_user {
  __typename: "User";
  username: string;
}

export interface FeedData_getFeed_likes_user {
  __typename: "User";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  username: string;
}

export interface FeedData_getFeed_likes {
  __typename: "Like";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  user: FeedData_getFeed_likes_user;
}

export interface FeedData_getFeed {
  __typename: "Tweet";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  text: string;
  createdAt: FwitterDateTime;
  user: FeedData_getFeed_user;
  likes: FeedData_getFeed_likes[];
}

export interface FeedData {
  getFeed: FeedData_getFeed[];
}
