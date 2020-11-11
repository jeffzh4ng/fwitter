import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { GraphqlAuthGuard } from 'src/guards/auth.guard'
import { User } from './user.entity'
import { UsersService } from './users.service'

@UseGuards(GraphqlAuthGuard)
@Resolver()
export class UsersResolver {
  constructor(private tweetsService: UsersService) {}

  @Query(returns => [User])
  async getManyByUsername(@Args('query', { type: () => String }) query: string) {
    const users = await this.tweetsService.findManyByUsername(query)
    return users
  }
}
