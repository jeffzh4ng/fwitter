import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username)

    // TODO: add bcrypt
    if (user && user.password === pass) {
      const { password, ...result } = user // strip out password
      return result
    }
    return null
  }
}
