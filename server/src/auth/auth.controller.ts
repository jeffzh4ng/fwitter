import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Post,
  Session,
  NotFoundException,
  Logger,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { COOKIE_NAME } from 'src/constants'
import { User } from 'src/users/user.entity'
import { UsersService } from 'src/users/users.service'
import { RestAuthGuard } from '../guards/auth.guard'
import { ConfigService } from '@nestjs/config'

// logins in with google -> GET /auth/google -> google auth -> GET /auth/google/callback (if user exists, redirect to dashboard, o/w redirect to /signup)

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(private userService: UsersService, private configService: ConfigService) {}

  @Get('google')
  @UseGuards(AuthGuard('google')) // uses passport google strategy and redirects client to authorization server
  googleLogin() {
    // no body in this route, bc passport AuthGuard will redirect client to google's authorization server
  }

  @Get('google/callback') // google auth will call this callaback route
  @UseGuards(AuthGuard('google')) // using AuthGuard('google') calls GoogleStrategy.validate()
  googleLoginCallback(@Req() req, @Res() res, @Session() session: { thirdPartyId?: string }) {
    // if user exists, redirect to dashboard
    // if user dne, redirect to signup page (confirm email, and username)
    session.thirdPartyId = req.user.thirdPartyId
    const clientURL = this.configService.get('CLIENT_URL')
    res.redirect(`${clientURL}/dashboard`)
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
