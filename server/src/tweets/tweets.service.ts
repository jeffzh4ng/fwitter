import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/user.entity'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { Tweet } from './tweet.entity'

@Injectable()
export class TweetsService {
  private readonly logger = new Logger(TweetsService.name)

  constructor(
    @InjectRepository(Tweet) private tweetsRepository: Repository<Tweet>,
    private usersService: UsersService
  ) {}

  async findOne(tweetId: string): Promise<Tweet> {
    try {
      const tweet = await this.tweetsRepository.findOne({ where: { id: tweetId } })
      return tweet
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  async findAllTweetsFromUser(userId: string): Promise<Array<Tweet>> {
    try {
      const tweets = await this.tweetsRepository.find({ where: { user: userId } })
      return tweets.reverse()
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  async createOne(data: { userId: string; text: string }): Promise<Tweet> {
    try {
      const user = await this.usersService.findOneByUserId(data.userId)
      const createdTweet = await this.tweet({ ...data, user })
      return createdTweet
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  private async tweet(data: { user: User; text: string }): Promise<Tweet> {
    try {
      const { user, text } = data

      const tweet = new Tweet()
      tweet.text = text
      tweet.user = user

      await this.tweetsRepository.save(tweet)
      return tweet
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }
}
