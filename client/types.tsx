interface TweetProps {
  previousScreen: 'Feed' | 'Profile'
}

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
  Tweet: undefined
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
  Tweet: TweetProps
}
