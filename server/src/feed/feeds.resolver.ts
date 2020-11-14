import { Resolver, Query, Args, Context } from '@nestjs/graphql'
import { GraphQLID } from 'graphql'
import { Tweet } from 'src/tweets/tweet.entity'
import { Feed } from './feed.entity'
import { FeedsService } from './feeds.service'

@Resolver(of => Feed)
export class FeedsResolver {
  constructor(private feedService: FeedsService) {}

  @Query(returns => [Tweet])
  async getFeed(@Context() ctx: any) {
    const { userId } = ctx.req.session
    const tweets = await this.feedService.getFeed(userId)
    console.log(tweets)
    return tweets
  }

  @Query(returns => [Tweet])
  async getProfileFeed(@Args('userId', { type: () => GraphQLID }) userId: string) {
    console.log('getting feed for', userId)

    const tweets = await this.feedService.getProfileFeed(userId)
    return tweets
  }
}
