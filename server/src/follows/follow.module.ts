import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Follow } from './follow.entity'
import { FollowsResolver } from './follows.resolver'
import { FollowsService } from './follows.service'

@Module({
  imports: [TypeOrmModule.forFeature([Follow])],
  providers: [FollowsResolver, FollowsService],
  exports: [],
})
export class FeedsModule {}
