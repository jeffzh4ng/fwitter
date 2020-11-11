import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { GraphqlAuthGuard } from 'src/guards/auth.guard'
import { StrippedUser, User } from './user.entity'
import { UsersService } from './users.service'

@UseGuards(GraphqlAuthGuard)
@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(returns => [User])
  async getManyByUsername(@Args('query', { type: () => String }) query: string) {
    const users = await this.usersService.findManyByUsername(query)
    return users
  }

  @Query(returns => User)
  async getOneByUsername(
    @Args('username', { type: () => String }) username: string
  ): Promise<StrippedUser | null> {
    const user = await this.usersService.findOneByUsername(username)
    console.log(user)

    const { password, ...result } = user

    return result
  }
}
