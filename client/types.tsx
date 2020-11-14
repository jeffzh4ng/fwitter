import { ProfileTweetsTabProps } from './screens/app/ProfileScreen/Tweets'
import { TweetScreenProps } from './screens/app/CreateTweetScreen'
import { ProfileScreenProps } from './screens/app/ProfileScreen'
import { FocusedTweetScreenProps } from './screens/app/FocusedTweetScreen'

export type DrawerParamList = {
  Root: undefined
  Landing: undefined
  Login: undefined
  SignUp: undefined
  Verify: undefined
  EnterPassword: undefined
  ForgotPassword: undefined
  NotFound: undefined
  Profile: ProfileScreenProps
  CreateTweet: TweetScreenProps
}

export type BottomTabParamList = {
  Feed: undefined
  Search: undefined
  Notifications: undefined
  Messages: undefined
}

export type HomeStackParamList = {
  Feed: undefined
  Profile: ProfileScreenProps
  CreateTweet: TweetScreenProps
  FocusedTweet: FocusedTweetScreenProps
}

export type ProfileTabParamList = {
  Tweets: ProfileTweetsTabProps
}
