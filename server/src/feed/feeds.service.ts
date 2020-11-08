import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { TweetsService } from 'src/tweets/tweets.service'
import { UsersService } from 'src/users/users.service'
import { Tweet } from '../tweets/tweet.entity'

@Injectable()
export class FeedsService {
  private readonly logger = new Logger(FeedsService.name)

  constructor(private usersService: UsersService, private tweetsService: TweetsService) {}

  async getFeed(userId: string): Promise<Array<Tweet>> {
    try {
      // get list of followees ids
      const unsortedFeed = await this.buildUnsortedFeed(userId)
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
    const followees = await this.usersService.getFollowingList(userId)
    const followeesTweetsPromises: Array<Promise<Array<Tweet>>> = followees.map(followee =>
      this.tweetsService.findAllTweetsFromUser(followee.id)
    )

    const unsortedFeed = (await Promise.all(followeesTweetsPromises)).flat(1)
    return unsortedFeed
  }

  private sortFeed(unsortedFeed: Array<Tweet>): Array<Tweet> {
    const sortedFeed = unsortedFeed.sort(
      (tweetA: Tweet, tweetB: Tweet) => tweetB.date.getTime() - tweetA.date.getTime()
    )

    return sortedFeed
  }
}
