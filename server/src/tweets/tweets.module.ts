import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { UsersModule } from 'src/users/users.module'
import { Tweet } from './tweet.entity'
import { TweetsResolver } from './tweets.resolver'
import { TweetsService } from './tweets.service'

@Module({
  imports: [TypeOrmModule.forFeature([Tweet]), UsersModule],
  providers: [TweetsResolver, TweetsService],
  exports: [],
})
export class TweetsModule {}
