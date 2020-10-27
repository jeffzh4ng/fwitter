import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { Provider } from 'src/auth/auth.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { generateUsername } from 'src/utils/username-generator'

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
    }
  }

  async createOne(thirdPartyId: string, provider: Provider): Promise<User | undefined> {
    try {
      const username = await this.getUsername()

      const user = await this.usersRepository.create({
        username,
      })

      await this.usersRepository.save(user)

      return user
    } catch (e) {
      throw new InternalServerErrorException('usersService.createOne()', e)
    }
  }

  private async getUsername(): Promise<string> {
    let username = generateUsername()

    while (true) {
      try {
        const user = await this.usersRepository.findOne({ where: { username } })
        if (!user) break

        username = generateUsername()
      } catch (e) {
        throw new InternalServerErrorException('usersService.getUsername()', e)
      }
    }

    return username
  }
}
