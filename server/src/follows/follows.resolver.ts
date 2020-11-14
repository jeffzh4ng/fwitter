import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { Follow } from './follow.entity'
import { FollowsGuard } from './follows.guard'
import { FollowsService } from './follows.service'

@Resolver(of => Follow)
@UseGuards(FollowsGuard)
export class FollowsResolver {
  constructor(private followsService: FollowsService) {}

  @Mutation(returns => Follow)
  async follow(
    @Args('followerId', { type: () => String }) followerId: string,
    @Args('followeeId', { type: () => String }) followeeId: string
  ) {
    return this.followsService.toggleFollow(followerId, followerId)
  }
}
