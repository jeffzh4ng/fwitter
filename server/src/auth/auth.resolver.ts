import { Post, Logger, BadRequestException, UnauthorizedException } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { COOKIE_NAME } from 'src/constants'
import { StrippedUser, User } from 'src/users/user.entity'
import { UsersService } from 'src/users/users.service'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name)

  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Mutation(returns => User)
  async signup(
    @Context() ctx: any,
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String }) password: string
  ): Promise<StrippedUser> {
    const user = await this.userService.createOne(username, password)
    if (!user) throw new BadRequestException('Username already in use.')

    const session = ctx.req.session
    session.userId = user.id

    console.log('signed up: ', session)

    const { password: strippedPassword, ...strippedUser } = user
    return strippedUser
  }

  @Mutation(returns => User)
  async login(
    @Context() ctx: any,
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String }) password: string
  ) {
    const user = await this.authService.validateUser(username, password)
    console.log(username, password, user)

    if (!user) throw new UnauthorizedException()

    const session = ctx.req.session
    session.userId = user.id

    return user
  }

  @Mutation(returns => User)
  async me(@Context() ctx: any): Promise<StrippedUser | null> {
    const session = ctx.req.session
    const user = await this.userService.findOneByUserId(session.userId)

    const { password, ...result } = user

    return result
  }

  @Post('logout')
  async logout(@Context() ctx: any): Promise<boolean> {
    const session = ctx.session
    const res = ctx.res

    return new Promise(resolve =>
      session.destroy(e => {
        res.clearCookie(COOKIE_NAME)

        if (e) {
          this.logger.error(e)
          resolve(false)
        }
        resolve(true)
      })
    )
  }
}
