import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { FollowsService } from 'src/follows/follows.service'
import { TweetsService } from 'src/tweets/tweets.service'
import { Tweet } from '../tweets/tweet.entity'

@Injectable()
export class FeedsService {
  private readonly logger = new Logger(FeedsService.name)

  constructor(private followsService: FollowsService, private tweetsService: TweetsService) {}

  async getFeed(userId: string): Promise<Array<Tweet>> {
    try {
      // get list of followees ids
      const unsortedFeed = await this.buildUnsortedFeed(userId)
      console.log(unsortedFeed)
      return this.sortFeed(unsortedFeed).slice(0, 100) // TODO: paginate
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  async getProfileFeed(userId: string): Promise<Array<Tweet>> {
    try {
      const tweets = await this.tweetsService.findAllTweetsFromUser(userId)
      return tweets
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  private async buildUnsortedFeed(userId: string) {
    const followees = await this.followsService.getFollowingList(userId)
    const followeesTweetsPromises: Array<Promise<Array<Tweet>>> = followees.map(followee =>
      this.tweetsService.findAllTweetsFromUser(followee.target.id)
    )

    const unsortedFeed = (await Promise.all(followeesTweetsPromises)).flat(1)
    return unsortedFeed
  }

  private sortFeed(unsortedFeed: Array<Tweet>): Array<Tweet> {
    const sortedFeed = unsortedFeed.sort(
      (tweetA: Tweet, tweetB: Tweet) => tweetB.createdAt.getTime() - tweetA.createdAt.getTime()
    )

    return sortedFeed
  }
}
