import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { Follow } from './follow.entity'

@Injectable()
export class FollowsService {
  private readonly logger = new Logger(FollowsService.name)

  constructor(
    @InjectRepository(Follow) private followsRepository: Repository<Follow>,
    private usersService: UsersService
  ) {}

  async toggleFollow({ userId, targetId }: { userId: string; targetId: string }): Promise<Follow> {
    try {
      const user = await this.usersService.findOneByUserId(userId)
      const target = await this.usersService.findOneByUserId(targetId)

      const existingFollow = await this.followsRepository.findOne({ where: { user, target } })
      if (existingFollow) {
        await this.followsRepository.delete(existingFollow.id)
        return existingFollow
      } else {
        const follow = new Follow()

        follow.user = user
        follow.target = target

        await this.followsRepository.save(follow)
        return follow
      }
    } catch (e) {
      this.logger.log(e)
      throw new InternalServerErrorException(e)
    }
  }

  async getFollowingList(userId: string): Promise<Array<Follow>> {
    try {
      const followingList = await this.followsRepository.find({
        where: {
          user: userId,
        },
        relations: ['target'],
      })

      return followingList
    } catch (e) {
      this.logger.log(e)
      throw new InternalServerErrorException(e)
    }
  }
}
