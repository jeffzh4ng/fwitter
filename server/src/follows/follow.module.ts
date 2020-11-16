import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotificationsModule } from 'src/notifications/notifications.module'
import { UsersModule } from 'src/users/users.module'
import { Follow } from './follow.entity'
import { FollowsResolver } from './follows.resolver'
import { FollowsService } from './follows.service'

@Module({
  imports: [TypeOrmModule.forFeature([Follow]), UsersModule, NotificationsModule],
  providers: [FollowsResolver, FollowsService],
  exports: [FollowsService],
})
export class FollowsModule {}
