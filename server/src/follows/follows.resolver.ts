import { Resolver, Query, Args } from '@nestjs/graphql'
import { GraphQLBoolean } from 'graphql'
import { Follow } from './follow.entity'
import { FollowsService } from './follows.service'

@Resolver(of => Follow)
export class FollowsResolver {
  constructor(private followsService: FollowsService) {}

  @Query(returns => GraphQLBoolean)
  async follow(
    @Args('followerId', { type: () => String }) followerId: string,
    @Args('followeeId', { type: () => String }) followeeId: string
  ) {
    return this.followsService
  }

  @Query(returns => GraphQLBoolean)
  async unfollow(
    @Args('followerId', { type: () => String }) followerId: string,
    @Args('followeeId', { type: () => String }) followeeId: string
  ) {
    return true
  }
}
