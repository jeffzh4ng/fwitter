import { Controller, Request, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller()
export class AppController {
  @UseGuards(AuthGuard('oauth'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user
  }
}
