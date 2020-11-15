/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchTweetsData
// ====================================================

export interface SearchTweetsData_searchTweets_likes_user {
  __typename: "User";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  username: string;
}

export interface SearchTweetsData_searchTweets_likes {
  __typename: "Like";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  user: SearchTweetsData_searchTweets_likes_user;
}

export interface SearchTweetsData_searchTweets_user {
  __typename: "User";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  username: string;
}

export interface SearchTweetsData_searchTweets {
  __typename: "Tweet";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  createdAt: FwitterDateTime;
  likes: SearchTweetsData_searchTweets_likes[];
  text: string;
  type: string;
  user: SearchTweetsData_searchTweets_user;
}

export interface SearchTweetsData {
  searchTweets: SearchTweetsData_searchTweets[];
}

export interface SearchTweetsDataVariables {
  query: string;
}
