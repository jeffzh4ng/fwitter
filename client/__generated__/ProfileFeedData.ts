/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfileFeedData
// ====================================================

export interface ProfileFeedData_getProfileFeed_parent_user {
  __typename: "User";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  username: string;
}

export interface ProfileFeedData_getProfileFeed_parent {
  __typename: "Tweet";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  text: string;
  user: ProfileFeedData_getProfileFeed_parent_user;
}

export interface ProfileFeedData_getProfileFeed_user {
  __typename: "User";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  username: string;
}

export interface ProfileFeedData_getProfileFeed_likes_user {
  __typename: "User";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  username: string;
}

export interface ProfileFeedData_getProfileFeed_likes {
  __typename: "Like";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  user: ProfileFeedData_getProfileFeed_likes_user;
}

export interface ProfileFeedData_getProfileFeed {
  __typename: "Tweet";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  text: string;
  createdAt: FwitterDateTime;
  type: string;
  parent: ProfileFeedData_getProfileFeed_parent | null;
  user: ProfileFeedData_getProfileFeed_user;
  likes: ProfileFeedData_getProfileFeed_likes[];
}

export interface ProfileFeedData {
  getProfileFeed: ProfileFeedData_getProfileFeed[];
}

export interface ProfileFeedDataVariables {
  userId: string;
}
