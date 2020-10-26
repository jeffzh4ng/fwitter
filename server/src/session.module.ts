// session stuff
import { Redis as RedisModule } from './redis.module'
import { RedisService } from 'nestjs-redis'
import * as connectRedis from 'connect-redis'
import * as session from 'express-session'
import { NestSessionOptions, SessionModule } from 'nestjs-session'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { COOKIE_NAME } from './constants'

const RedisStore = connectRedis(session) // this is not the client, this is the session store

export const Session = SessionModule.forRootAsync({
  imports: [RedisModule, ConfigModule], // need to import these to get access to their services within inject
  inject: [RedisService, ConfigService], // injects these services as params when useFactory() is called
  useFactory: (redisService: RedisService, config: ConfigService): NestSessionOptions => {
    return {
      session: {
        name: COOKIE_NAME,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year in ms
          // httpOnly: true, // prevent client side JS from accessing cookie, and hence, XSS attacks
          // secure: false, // cookie only works in https, set false in local bc local dev doesn't use https
          // sameSite: 'lax',
        },
        store: new RedisStore({ client: redisService.getClient() }),
        secret: config.get('SESSION_SECRET'),
        saveUninitialized: false, // don't store empty sessions in our store
      },
    }
  },
})
