import { Module } from '@nestjs/common'
import { TweetsModule } from 'src/tweets/tweets.module'
import { UsersModule } from 'src/users/users.module'
import { FeedsResolver } from './feeds.resolver'
import { FeedsService } from './feeds.service'

@Module({
  imports: [TweetsModule, UsersModule],
  providers: [FeedsResolver, FeedsService],
  exports: [],
})
export class FeedsModule {}
