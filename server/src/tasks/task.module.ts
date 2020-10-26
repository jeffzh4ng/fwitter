import { Module } from '@nestjs/common'
import { ClassesModule } from 'src/classes/classes.module'
import { TasksService } from './tasks.service'

@Module({
  imports: [ClassesModule],
  providers: [TasksService],
})
export class TasksModule {}
