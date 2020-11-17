/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FocusedTweetData
// ====================================================

export interface FocusedTweetData_getTweetById_user {
  __typename: "User";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  username: string;
}

export interface FocusedTweetData_getTweetById_likes_user {
  __typename: "User";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  username: string;
}

export interface FocusedTweetData_getTweetById_likes {
  __typename: "Like";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  user: FocusedTweetData_getTweetById_likes_user;
}

export interface FocusedTweetData_getTweetById_children_user {
  __typename: "User";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  username: string;
}

export interface FocusedTweetData_getTweetById_children_likes_user {
  __typename: "User";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  username: string;
}

export interface FocusedTweetData_getTweetById_children_likes {
  __typename: "Like";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  user: FocusedTweetData_getTweetById_children_likes_user;
}

export interface FocusedTweetData_getTweetById_children {
  __typename: "Tweet";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  text: string;
  createdAt: FwitterDateTime;
  user: FocusedTweetData_getTweetById_children_user;
  likes: FocusedTweetData_getTweetById_children_likes[];
}

export interface FocusedTweetData_getTweetById {
  __typename: "Tweet";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  text: string;
  type: string;
  createdAt: FwitterDateTime;
  user: FocusedTweetData_getTweetById_user;
  likes: FocusedTweetData_getTweetById_likes[];
  children: FocusedTweetData_getTweetById_children[];
}

export interface FocusedTweetData {
  getTweetById: FocusedTweetData_getTweetById;
}

export interface FocusedTweetDataVariables {
  tweetId: string;
}
