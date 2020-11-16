import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { NotificationType } from 'src/notifications/notifications.entity'
import { NotificationsService } from 'src/notifications/notifications.service'
import { User } from 'src/users/user.entity'
import { UsersService } from 'src/users/users.service'
import { Like as TypeOrmLike, Repository } from 'typeorm'
import { Hashtag } from './hashtag.entity'
import { Like } from './like.entity'
import { Tweet, TweetType } from './tweet.entity'

@Injectable()
export class TweetsService {
  private readonly logger = new Logger(TweetsService.name)

  constructor(
    @InjectRepository(Tweet) private tweetsRepository: Repository<Tweet>,
    @InjectRepository(Like) private likesRepository: Repository<Like>,
    @InjectRepository(Hashtag) private hashtagsRepository: Repository<Hashtag>,
    private notificationsService: NotificationsService,
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
        relations: ['likes', 'children', 'parent', 'parent.likes'],
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
      await this.createHashes(createdTweet)
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
        await this.notificationsService.createNotification({
          targetId: newLike.id,
          targetUserId: tweet.user.id,
          type: NotificationType.LIKE,
        })
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

      const parent = await this.tweetsRepository.findOne({
        where: { id: parentId },
        relations: ['parent', 'parent.user'],
      })

      const tweet = new Tweet()
      tweet.text = text
      tweet.user = user
      tweet.type = type
      tweet.parent = parent

      await this.tweetsRepository.save(tweet)

      const tweetIsReplyOrRetweet =
        tweet.type === TweetType.REPLY || tweet.type === TweetType.RETWEET

      if (tweetIsReplyOrRetweet) {
        await this.notificationsService.createNotification({
          targetId: tweet.parent.id,
          targetUserId: tweet.parent.user.id,
          type: NotificationType.LIKE,
        })
      }

      return tweet
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  private async createHashes(createdTweet: Tweet): Promise<void> {
    try {
      console.log('creating hashes')
      const tags = createdTweet.text.split(' ').filter(word => word.startsWith('#'))
      const createdHashtagPromises: Array<Promise<Hashtag>> = tags.map(tag => {
        const createdHashtag = new Hashtag()
        createdHashtag.tag = tag
        createdHashtag.tweet = createdTweet
        return this.hashtagsRepository.save(createdHashtag)
      })

      await Promise.all(createdHashtagPromises)
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }
}
