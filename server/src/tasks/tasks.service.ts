import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { ClassesService } from 'src/classes/classes.service'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  constructor(private classesService: ClassesService) {}

  @Cron(CronExpression.EVERY_DAY_AT_5AM)
  async handleCron() {
    this.logger.debug('Updating classes...')
    await this.classesService.updateClasses()
    const classes = await this.classesService.findAll()
    this.logger.debug(classes)
    this.logger.debug('Updated classes successfully.')
  }
}
