import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClassesModule } from 'src/classes/classes.module'
import { UsersModule } from 'src/users/users.module'
import { Message } from './message.entity'
import { MessagesResolver } from './messages.resolver'
import { MessagesService } from './messages.service'

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UsersModule, ClassesModule],
  providers: [MessagesResolver, MessagesService],
})
export class MessagesModule {}
