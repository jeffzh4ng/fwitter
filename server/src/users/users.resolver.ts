import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { GraphQLID } from 'graphql'
import { GraphqlAuthGuard } from 'src/guards/auth.guard'
import { StrippedUser, User } from './user.entity'
import { UsersService } from './users.service'

// @UseGuards(GraphqlAuthGuard)
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

    const { password, ...result } = user

    return result
  }

  @Query(returns => User)
  async getOneByUserId(
    @Args('userId', { type: () => GraphQLID }) userId: string
  ): Promise<StrippedUser | null> {
    const user = await this.usersService.findOneByUserId(userId)

    const { password, ...result } = user

    return result
  }

  @Mutation(returns => User)
  async updateUser(
    @Context() ctx: any,
    @Args('name', { type: () => String }) name: string,
    @Args('bio', { type: () => String }) bio: string,
    @Args('website', { type: () => String }) website: string
  ) {
    const { userId } = ctx.req.session
    const user = await this.usersService.updateOne({ userId, name, bio, website })
    return user
  }
}
