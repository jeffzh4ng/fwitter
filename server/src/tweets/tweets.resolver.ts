import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { GraphqlAuthGuard } from 'src/guards/auth.guard'
import { Tweet } from './tweet.entity'
import { TweetsService } from './tweets.service'

@UseGuards(GraphqlAuthGuard)
@Resolver(of => Tweet)
export class TweetsResolver {
  constructor(private tweetsService: TweetsService) {}

  @Query(returns => [Tweet])
  async getTweetById(@Args('tweetId', { type: () => String }) tweetId: string) {
    const tweets = await this.tweetsService.findOne(tweetId)
    return tweets
  }

  @Mutation(returns => Tweet)
  async createTweet(@Context() ctx: any, @Args('text', { type: () => String }) text: string) {
    const { userId } = ctx.req.session
    const tweet = await this.tweetsService.createOne({ userId, text })
    console.log('created tweet on backend', tweet)

    return tweet
  }
}
