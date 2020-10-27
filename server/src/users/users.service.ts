import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async findOne(userId: string): Promise<User | undefined> {
    try {
      return await this.usersRepository.findOne({
        where: {
          userId,
        },
      })
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  async createOne(username: string, password: string): Promise<User | false> {
    try {
      const usersWithSameUsername = await this.usersRepository.find({ where: { username } })
      if (usersWithSameUsername.length > 0) return false

      const user = new User()
      user.username = username
      user.password = password // TODO: hash passwords instead of storing raw
      return await this.usersRepository.save(user)
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  async getFollowingList(userId: string): Promise<Array<User>> {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          userId,
        },
      })

      const follows = user.following
      return follows.map(follow => follow.follower)
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }
}
