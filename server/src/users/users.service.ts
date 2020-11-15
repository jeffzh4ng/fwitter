import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async findOneByUsername(username: string): Promise<User | undefined> {
    try {
      return await this.usersRepository.findOne({
        where: {
          username,
        },
      })
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  async findOneByUserId(userId: string): Promise<User | undefined> {
    try {
      return await this.usersRepository.findOne({
        where: {
          id: userId,
        },
      })
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  async findManyByUsername(username: string): Promise<Array<User>> {
    if (username.length === 0) return []

    try {
      const users = await this.usersRepository
        .createQueryBuilder('user')
        .where('user.username ilike :username', { username: `%${username}%` })
        .getMany()

      return users
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
}
