import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/user.entity'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { Like } from './like.entity'
import { Tweet, TweetType } from './tweet.entity'

@Injectable()
export class TweetsService {
  private readonly logger = new Logger(TweetsService.name)

  constructor(
    @InjectRepository(Tweet) private tweetsRepository: Repository<Tweet>,
    @InjectRepository(Like) private likesRepository: Repository<Like>,
    private usersService: UsersService
  ) {}

  async findOne(tweetId: string): Promise<Tweet> {
    try {
      const tweet = await this.tweetsRepository.findOne({
        where: { id: tweetId },
        relations: ['likes', 'children'],
      })
      return tweet
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  async findAllTweetsFromUser(userId: string): Promise<Array<Tweet>> {
    try {
      const tweets = await this.tweetsRepository.find({
        where: { user: userId },
        relations: ['likes', 'children'],
      })
      return tweets.reverse()
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  async createOne(data: { userId: string; text: string; type: TweetType }): Promise<Tweet> {
    try {
      const user = await this.usersService.findOneByUserId(data.userId)
      const createdTweet = await this.tweet({ ...data, user })
      return createdTweet
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  async likeOne(data: { userId: string; tweetId: string }): Promise<Like> {
    try {
      const user = await this.usersService.findOneByUserId(data.userId)
      const tweet = await this.findOne(data.tweetId)
      const existingLike = await this.likesRepository.findOne({ where: { user, tweet } })

      if (existingLike) {
        console.log('removed like')
        await this.likesRepository.delete(existingLike.id)
        return existingLike
      } else {
        const newLike = await this.createNewLike(user, tweet)
        return newLike
      }
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  private async createNewLike(user: User, tweet: Tweet): Promise<Like> {
    try {
      const like = new Like()
      like.user = user
      like.tweet = tweet

      await this.likesRepository.save(like)

      return like
    } catch (e) {
      throw e
    }
  }

  private async tweet(data: { user: User; text: string; type: TweetType }): Promise<Tweet> {
    try {
      const { user, text, type } = data

      const tweet = new Tweet()
      tweet.text = text
      tweet.user = user
      tweet.type = type

      await this.tweetsRepository.save(tweet)
      return tweet
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }
}
