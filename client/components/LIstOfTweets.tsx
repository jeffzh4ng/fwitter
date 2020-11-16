import * as React from 'react'
import { FlatList, SafeAreaView, StyleSheet, Image, Text, View, Pressable } from 'react-native'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import moment from 'moment'
import { AntDesign } from '@expo/vector-icons'
import { ProfileFeedData_getProfileFeed } from '../__generated__/ProfileFeedData'
import { CREATE_TWEET_MUTATION, LIKE_TWEET_MUTATION, ME_MUTATION } from '../mutations'
import { useMutation } from '@apollo/client'
import { StackNavigationProp } from '@react-navigation/stack'
import { HomeStackParamList } from '../types'
import { TweetType } from '../__generated__/globalTypes'
import { meData } from '../__generated__/meData'

type ListOfTweetsNavigationProp = StackNavigationProp<HomeStackParamList, 'Feed'>

interface Props {
  navigation: ListOfTweetsNavigationProp
  tweets: Array<ProfileFeedData_getProfileFeed & { liked: boolean }>
  previousScreen: string
  refetchQueryInfo?: {
    query: import('graphql').DocumentNode
    variables?: { [variable: string]: string }
  }
}

export const ListOfTweets = ({ navigation, tweets, previousScreen, refetchQueryInfo }: Props) => {
  const [likeTweet] = useMutation(LIKE_TWEET_MUTATION)
  const [retweet] = useMutation(CREATE_TWEET_MUTATION)
  const [me, { data: meDataResult }] = useMutation<meData>(ME_MUTATION)

  React.useEffect(() => {
    me()
  }, [])

  if (!meDataResult) return <Text>Loading</Text>

  const handleOnTweet = () =>
    navigation.replace('CreateTweet', {
      previousScreen: 'Profile',
    })

  const handleOnLike = (tweetId: string) =>
    likeTweet({
      variables: { tweetId },
      ...(refetchQueryInfo && { refetchQueries: [refetchQueryInfo] }),
    })

  const handleOnReply = (tweetId: string) =>
    navigation.replace('CreateTweet', {
      parentId: tweetId,
      // @ts-ignore
      previousScreen,
    })

  const handleOnRetweet = (tweetId: string) => {
    retweet({ variables: { text: '', type: TweetType.RETWEET, parentId: tweetId } })
  }

  const handleOnNavigationToProfile = (userId: string) => {
    navigation.navigate('Profile', {
      userId,
    })
  }

  const handleOnNavigateToTweet = (tweetId: string) => {
    console.log('previous screen', previousScreen)

    if (previousScreen === 'Search') {
      navigation.navigate('Feed', {
        screen: 'FocusedTweet',
        params: {
          tweetId,
          handleOnLike,
          handleOnReply,
          handleOnRetweet,
        },
      })
    } else {
      navigation.push('FocusedTweet', {
        tweetId,
        handleOnLike,
        handleOnReply,
        handleOnRetweet,
      })
    }
  }

  const handleOnHashtagClick = (tag: string) => {
    navigation.navigate('SearchResult', {
      query: tag,
    })
  }

  const renderTweet = ({ item }: { item: ProfileFeedData_getProfileFeed & { liked: boolean } }) => {
    return (
      <Tweet
        tweet={item}
        handleOnLike={handleOnLike}
        handleOnReply={handleOnReply}
        handleOnNavigateToTweet={handleOnNavigateToTweet}
        handleOnNavigationToProfile={handleOnNavigationToProfile}
        handleOnRetweet={handleOnRetweet}
        handleOnHashtagClick={handleOnHashtagClick}
      />
    )
  }

  const massagedTweets: Array<ProfileFeedData_getProfileFeed & { liked: boolean }> = tweets.map(
    (tweet) => {
      const userId = meDataResult.me.ID

      let liked = false
      if (tweet.likes.some((like) => like.user.ID === userId)) liked = true

      return {
        ...tweet,
        liked,
      }
    }
  )

  return (
    <SafeAreaView style={styles.home}>
      <FlatList data={massagedTweets} renderItem={renderTweet} keyExtractor={(item) => item.ID} />
      {handleOnTweet ? (
        <View
          style={{ backgroundColor: 'transparent', bottom: 15, position: 'absolute', right: 15 }}
        >
          <Pressable
            style={{ backgroundColor: '#1fa1fa', borderRadius: 100, padding: 15 }}
            onPress={handleOnTweet}
          >
            <MaterialCommunityIcons name="feather" size={24} color="white" />
          </Pressable>
        </View>
      ) : null}
    </SafeAreaView>
  )
}

const Tweet = (props: {
  tweet: ProfileFeedData_getProfileFeed & { liked: boolean }
  handleOnLike: (tweetId: string) => void
  handleOnReply: (tweetId: string) => void
  handleOnRetweet: (tweetId: string) => void
  handleOnNavigateToTweet: (tweetId: string) => void
  handleOnNavigationToProfile: (userId: string) => void
  handleOnHashtagClick: (tag: string) => void
}) => {
  const {
    handleOnLike,
    handleOnReply,
    handleOnNavigateToTweet,
    handleOnNavigationToProfile,
    handleOnRetweet,
    handleOnHashtagClick,
  } = props

  const isRetweet = props.tweet.type === 'retweet'
  const tweet = isRetweet && props.tweet.parent ? props.tweet.parent : props.tweet

  return (
    <Pressable
      onPress={() => {
        handleOnNavigateToTweet(tweet.ID)
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderBottomColor: '#eee',
          borderBottomWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <Pressable
          onPress={() => {
            handleOnNavigationToProfile(tweet.user.ID)
          }}
        >
          <Image
            style={{ borderRadius: 100, height: 50, width: 50 }}
            source={{
              uri: 'https://image.flaticon.com/icons/png/512/194/194938.png',
            }}
          />
        </Pressable>

        <View style={{ flexShrink: 1, marginLeft: 10 }}>
          {isRetweet ? (
            <Text style={{ color: '#1fa1fa' }}>{tweet.user.username} retweeted</Text>
          ) : null}

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {/* <Text style={{ fontSize: 16, fontWeight: '700' }}>John Doe</Text> */}
            <Text style={{ fontSize: 16, marginLeft: 3 }}>@{tweet.user.username}</Text>
            <Text style={{ fontSize: 16, marginLeft: 3 }}>
              • {moment(tweet.createdAt).fromNow()}
            </Text>
          </View>

          <TweetText text={tweet.text} handleOnHashtagClick={handleOnHashtagClick} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
            <Pressable
              onPress={() => {
                handleOnReply(tweet.ID)
              }}
            >
              <FontAwesome name="comment-o" size={17} color="#6A7A89" />
            </Pressable>

            <Pressable
              onPress={() => {
                handleOnRetweet(tweet.ID)
              }}
            >
              <AntDesign name="retweet" size={18} color="#6A7A89" />
            </Pressable>

            <View style={{ flexDirection: 'row' }}>
              <Pressable onPress={() => handleOnLike(tweet.ID)}>
                {tweet.liked ? (
                  <AntDesign name="heart" size={17} color="red" />
                ) : (
                  <AntDesign name="hearto" size={17} color={'#6A7A89'} />
                )}
              </Pressable>
              <Text style={{ marginLeft: 3 }}>{tweet.likes.length}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const TweetText = ({
  text,
  handleOnHashtagClick,
}: {
  handleOnHashtagClick: (hashtag: string) => void
  text: string
}) => {
  return (
    <View>
      <Text>
        {text.split(' ').map((word, i) => {
          const isHashtag = word.startsWith('#')

          return isHashtag ? (
            <Pressable key={i} onPress={() => handleOnHashtagClick(word)}>
              <Text style={{ color: '#1fa1fa' }}>{word + ' '}</Text>
            </Pressable>
          ) : (
            <Text key={i}>{word + ' '}</Text>
          )
        })}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#fff',
    height: '100%',
  },
})
