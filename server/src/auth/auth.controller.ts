import {
  Controller,
  Get,
  UseGuards,
  Res,
  Post,
  Session,
  Logger,
  Req,
  Body,
  BadRequestException,
} from '@nestjs/common'
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

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto, @Session() session: { username: string }, @Req() req) {
    const user = await this.userService.createOne(signupDto.username, signupDto.password)
    if (!user) throw new BadRequestException('Username already in use.')

    session.username = user.username

    const { password, ...strippedUser } = user
    return strippedUser
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req, @Session() session: { username?: string }) {
    session.username = req.user.username

    console.log(session)
    return req.user
  }

  @Get('me')
  @UseGuards(RestAuthGuard)
  async me(@Session() session: { username?: string }): Promise<User | null> {
    console.log(session)
    const user = await this.userService.findOneByUsername(session.username)
    console.log(user)

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
