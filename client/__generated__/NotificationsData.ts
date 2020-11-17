/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NotificationsData
// ====================================================

export interface NotificationsData_getNotifications_target_Like_user {
  __typename: "User";
  username: string;
}

export interface NotificationsData_getNotifications_target_Like {
  __typename: "Like";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  user: NotificationsData_getNotifications_target_Like_user;
  createdAt: FwitterDateTime;
}

export interface NotificationsData_getNotifications_target_Tweet_user {
  __typename: "User";
  username: string;
}

export interface NotificationsData_getNotifications_target_Tweet {
  __typename: "Tweet";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  text: string;
  user: NotificationsData_getNotifications_target_Tweet_user;
}

export interface NotificationsData_getNotifications_target_Follow_user {
  __typename: "User";
  username: string;
}

export interface NotificationsData_getNotifications_target_Follow {
  __typename: "Follow";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  user: NotificationsData_getNotifications_target_Follow_user;
}

export type NotificationsData_getNotifications_target = NotificationsData_getNotifications_target_Like | NotificationsData_getNotifications_target_Tweet | NotificationsData_getNotifications_target_Follow;

export interface NotificationsData_getNotifications {
  __typename: "Notification";
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
   */
  ID: string;
  createdAt: FwitterDateTime;
  type: string;
  target: NotificationsData_getNotifications_target;
}

export interface NotificationsData {
  getNotifications: NotificationsData_getNotifications[];
}
