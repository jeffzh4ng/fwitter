/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTweet
// ====================================================

export interface CreateTweet_createTweet {
  __typename: "Tweet";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  text: string;
}

export interface CreateTweet {
  createTweet: CreateTweet_createTweet;
}

export interface CreateTweetVariables {
  text: string;
}
