import { Resolver, Query, Args } from '@nestjs/graphql'
import { Tweet } from 'src/tweets/tweet.entity'
import { Feed } from './feed.entity'
import { FeedsService } from './feeds.service'

@Resolver(of => Feed)
export class FeedsResolver {
  constructor(private feedService: FeedsService) {}

  @Query(returns => [Tweet], { name: 'feed' })
  async getFeed(@Args('userId', { type: () => String }) userId: string) {
    const tweets = await this.feedService.getFeed(userId)
    return tweets
  }

  @Query(returns => [Tweet])
  async getProfileFeed(@Args('userId', { type: () => String }) userId: string) {
    const tweets = await this.feedService.getProfileFeed(userId)
    console.log('returning to client', tweets)
    return tweets
  }
}
