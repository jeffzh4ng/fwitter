import { ProfileTweetsTabProps } from './screens/app/ProfileScreen/Tweets'
import { TweetScreenProps } from './screens/app/CreateTweetScreen'

export type DrawerParamList = {
  Root: undefined
  Landing: undefined
  Login: undefined
  SignUp: undefined
  Verify: undefined
  EnterPassword: undefined
  ForgotPassword: undefined
  NotFound: undefined
  Profile: undefined
  Tweet: TweetScreenProps
}

export type BottomTabParamList = {
  Feed: undefined
  Search: undefined
  Notifications: undefined
  Messages: undefined
}

export type HomeStackParamList = {
  Feed: undefined
  Profile: undefined
  Tweet: TweetScreenProps
}

export type ProfileTabParamList = {
  Tweets: ProfileTweetsTabProps
}
