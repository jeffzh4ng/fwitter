import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> {
    try {
      let user = await this.usersService.findOne(thirdPartyId)
      if (!user) user = await this.usersService.createOne(thirdPartyId, provider)

      return thirdPartyId
    } catch (e) {
      throw new InternalServerErrorException('AuthService.validateOAuthLogin()', e)
    }
  }
}
