import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { GraphQLID } from 'graphql'
import { GraphqlAuthGuard } from 'src/guards/auth.guard'
import { Like } from './like.entity'
import { Tweet, TweetType } from './tweet.entity'
import { TweetsService } from './tweets.service'

// @UseGuards(GraphqlAuthGuard)
@Resolver(of => Tweet)
export class TweetsResolver {
  constructor(private tweetsService: TweetsService) {}

  @Query(returns => Tweet)
  async getTweetById(@Args('tweetId', { type: () => GraphQLID }) tweetId: string) {
    const tweet = await this.tweetsService.findOne(tweetId)
    console.log(tweet)
    return tweet
  }

  @Mutation(returns => Tweet)
  async createTweet(
    @Context() ctx: any,
    @Args('text', { type: () => String }) text: string,
    @Args('type', { type: () => TweetType }) type: TweetType,
    @Args('parentId', { type: () => GraphQLID, nullable: true }) parentId: string
  ) {
    const { userId } = ctx.req.session
    const tweet = await this.tweetsService.createOne({ userId, text, type, parentId })

    return tweet
  }

  @Mutation(returns => Tweet)
  async likeTweet(
    @Context() ctx: any,
    @Args('tweetId', { type: () => GraphQLID }) tweetId: string
  ): Promise<Like> {
    const { userId } = ctx.req.session
    const tweet = await this.tweetsService.toggleLike({ userId, tweetId })
    return tweet
  }

  @Query(returns => [Tweet])
  async searchTweets(@Args('query', { type: () => String }) query: string): Promise<Array<Tweet>> {
    const tweets = await this.tweetsService.findMany(query)
    return tweets
  }
}
