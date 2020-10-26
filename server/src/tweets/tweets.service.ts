import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
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

  async findOne(tweetId: string) {
    try {
      const tweet = await this.tweetsRepository.findOne({ where: { id: tweetId } })
      return tweet
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  async createOne(data: { userId: string; text: string }) {
    try {
      const { userId, text } = data

      const user = await this.usersService.findOne(userId)

      const tweet = new Tweet()
      tweet.text = text
      tweet.user = user

      await this.tweetsRepository.save(tweet)
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }
}
