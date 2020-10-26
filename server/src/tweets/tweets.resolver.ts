import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { GraphqlAuthGuard } from 'src/guards/auth.guard'
import { Tweet } from './tweet.entity'
import { TweetsService } from './tweets.service'

@UseGuards(GraphqlAuthGuard)
@Resolver(of => Tweet)
export class TweetsResolver {
  constructor(private tweetsService: TweetsService) {}

  @Query(returns => [Tweet], { name: 'tweet' })
  async getTweet(@Args('tweetId', { type: () => String }) tweetId: string) {
    const tweets = await this.tweetsService.findOne(tweetId)
    return tweets
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(returns => Tweet, { name: 'tweet' })
  async createTweet(@Context() ctx: any, @Args('text', { type: () => String }) text: string) {
    const { userId } = ctx.req.session
    const tweet = await this.tweetsService.createOne({ userId, text })

    return tweet
  }
}
