import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from 'src/users/users.module'
import { Follow } from './follow.entity'
import { FollowsResolver } from './follows.resolver'
import { FollowsService } from './follows.service'

@Module({
  imports: [TypeOrmModule.forFeature([Follow]), UsersModule],
  providers: [FollowsResolver, FollowsService],
  exports: [],
})
export class FollowsModule {}
