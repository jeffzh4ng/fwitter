import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrm as TypeOrmModule } from './typeorm.module'
import { ConfigModule } from '@nestjs/config'
import { Session as SessionModule } from './session.module'
import { TweetsModule } from './tweets/tweets.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

import { join } from 'path'
import { FollowsModule } from './follows/follow.module'
import { FeedsModule } from './feed/feeds.module'

@Module({
  imports: [
    // setup
    ConfigModule.forRoot(), // nestjs' way of faciliatng env variables
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      installSubscriptionHandlers: true,
      context: ({ req, res, payload, connection }) => ({ req, res, payload, connection }), // TODO: type this as GraphqlContext
    }),
    TypeOrmModule,
    SessionModule,
    // domain-related modules
    TweetsModule,
    AuthModule,
    UsersModule,
    FollowsModule,
    FeedsModule,
  ],
})
export class AppModule {}
