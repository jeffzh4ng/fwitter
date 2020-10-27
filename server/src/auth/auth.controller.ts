import { Controller, Get, UseGuards, Res, Post, Session, Logger, Req, Body } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { COOKIE_NAME } from 'src/constants'
import { User } from 'src/users/user.entity'
import { UsersService } from 'src/users/users.service'
import { RestAuthGuard } from '../guards/auth.guard'

interface SignupDto {
  username: string
  password: string
}

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req) {
    return req.user
  }

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto, @Session() session: { userId: string }) {
    const user = await this.userService.createOne(signupDto.username, signupDto.password)
    if (!user) return false

    session.userId = user.id

    const { password, ...strippedUser } = user
    return strippedUser
  }

  @Get('me')
  @UseGuards(RestAuthGuard)
  async me(@Session() session: { thirdPartyId?: string }): Promise<User | null> {
    const user = await this.userService.findOne(session.thirdPartyId)

    return user
  }

  @Post('logout')
  async logout(@Res() res, @Session() session): Promise<boolean> {
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
