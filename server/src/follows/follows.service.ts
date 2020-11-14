import { Injectable, Logger } from '@nestjs/common'
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

  async toggleFollow(followerId: string, followeeId: string): Promise<boolean> {
    try {
      const follower = await this.usersService.findOneByUserId(followerId)
      const followee = await this.usersService.findOneByUserId(followeeId)
      console.log(follower, followee)

      // left off: figure out if we're addressing users by id or username in backend system
      // also figure out, in this method specifically, how to find existing follow records to return false - do we need user objects? or user ids. look into how typeorm does N:N relationships

      const follow = new Follow()

      follow.follower = follower
      follow.followee = followee

      await this.followsRepository.save(follow)
      return true
    } catch (e) {}
  }
}
