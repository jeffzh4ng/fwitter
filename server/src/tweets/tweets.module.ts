import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from 'src/users/users.module'
import { Hashtag } from './hashtag.entity'
import { Like } from './like.entity'
import { Tweet } from './tweet.entity'
import { TweetsResolver } from './tweets.resolver'
import { TweetsService } from './tweets.service'

@Module({
  imports: [TypeOrmModule.forFeature([Tweet, Like, Hashtag]), UsersModule],
  providers: [TweetsResolver, TweetsService],
  exports: [TweetsService],
})
export class TweetsModule {}
