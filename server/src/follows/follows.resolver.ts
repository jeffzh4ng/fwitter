import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { GraphQLID } from 'graphql'
import { Follow } from './follow.entity'
import { FollowsGuard } from './follows.guard'
import { FollowsService } from './follows.service'

@Resolver(of => Follow)
@UseGuards(FollowsGuard)
export class FollowsResolver {
  constructor(private followsService: FollowsService) {}

  @Mutation(returns => Follow)
  async follow(@Context() ctx: any, @Args('targetId', { type: () => GraphQLID }) targetId: string) {
    const { userId } = ctx.req.session

    return this.followsService.toggleFollow({ userId, targetId })
  }
}
