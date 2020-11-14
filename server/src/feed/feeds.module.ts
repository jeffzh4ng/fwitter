import { Module } from '@nestjs/common'
import { FollowsModule } from 'src/follows/follow.module'
import { TweetsModule } from 'src/tweets/tweets.module'
import { FeedsResolver } from './feeds.resolver'
import { FeedsService } from './feeds.service'

@Module({
  imports: [TweetsModule, FollowsModule],
  providers: [FeedsResolver, FeedsService],
  exports: [],
})
export class FeedsModule {}
