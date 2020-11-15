import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/user.entity'
import { UsersService } from 'src/users/users.service'
import { Like as TypeOrmLike, Repository } from 'typeorm'
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
        relations: ['likes', 'children', 'children.likes'],
      })
      return tweet
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  async findMany(query: string): Promise<Array<Tweet>> {
    try {
      const tweets = await this.tweetsRepository.find({
        where: { text: TypeOrmLike(`%${query}%`), type: TweetType.REGULAR },
        relations: ['likes'],
      })

      return tweets
    } catch (e) {
      this.logger.log(e)
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

  async createOne(data: {
    userId: string
    text: string
    type: TweetType
    parentId?: string
  }): Promise<Tweet> {
    try {
      const user = await this.usersService.findOneByUserId(data.userId)
      const createdTweet = await this.tweet({ ...data, user, parentId: data.parentId })
      console.log(createdTweet)
      return createdTweet
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  async toggleLike(data: { userId: string; tweetId: string }): Promise<Like> {
    try {
      const user = await this.usersService.findOneByUserId(data.userId)
      const tweet = await this.findOne(data.tweetId)
      const existingLike = await this.likesRepository.findOne({ where: { user, tweet } })

      if (existingLike) {
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

  private async tweet(data: {
    user: User
    text: string
    type: TweetType
    parentId?: string
  }): Promise<Tweet> {
    try {
      const { user, text, type, parentId } = data

      const parent = await this.tweetsRepository.findOne({ where: { id: parentId } })

      const tweet = new Tweet()
      tweet.text = text
      tweet.user = user
      tweet.type = type
      tweet.parent = parent

      await this.tweetsRepository.save(tweet)

      return tweet
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }
}
