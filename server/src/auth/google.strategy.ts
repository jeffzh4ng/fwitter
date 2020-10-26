import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, StrategyOptionsWithRequest } from 'passport-google-oauth20'

import { AuthService, Provider } from './auth.service'

const CALLBACK_URL = 'http://localhost:3001/auth/google/callback'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  // fb strategy should be pretty much the same
  constructor(private authService: AuthService, configService: ConfigService) {
    super(<StrategyOptionsWithRequest>{
      // authorizationURL: 'https://www.provider.com/oauth2/authorize',
      // tokenURL: 'https://www.provider.com/oauth2/token',
      clientID: configService.get('GOOGLE_OAUTH2_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_OAUTH2_CLIENT_SECRET'),
      callbackURL: CALLBACK_URL,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    })
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function
  ) {
    try {
      const thirdPartyId = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE)
      const user = { thirdPartyId }

      done(null, user)
    } catch (err) {
      done(err, false)
    }
  }
}
