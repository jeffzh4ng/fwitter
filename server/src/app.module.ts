import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrm as TypeOrmModule } from './typeorm.module'
import { ConfigModule } from '@nestjs/config'
import { Session as SessionModule } from './session.module'
import { ScheduleModule } from '@nestjs/schedule'
import { TweetsModule } from './tweets/tweets.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

import { join } from 'path'

@Module({
  imports: [
    // setup
    ScheduleModule.forRoot(),
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
  ],
})
export class AppModule {}
