import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Notification, NotificationType } from './notifications.entity'
import { getConnection, Repository } from 'typeorm'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name)

  constructor(
    @InjectRepository(Notification) private notificationsRepository: Repository<Notification>,
    private usersService: UsersService
  ) {}

  async getNotifications(
    userId: string
  ): Promise<Array<Omit<Notification, 'target'> & { target: unknown }>> {
    try {
      const notifs = await this.notificationsRepository.find({ where: { targetUser: userId } })
      const populatedNotifsPromise = notifs.map(async n => {
        const tableName = `${n.target}s`
        const dbConnection = getConnection()
        const targetRepo = dbConnection.getRepository(tableName)
        const targetObject = await targetRepo.findOne({ where: { id: n.target } })

        const notifWithTargetPopulated = {
          ...n,
          target: targetObject,
        }

        return notifWithTargetPopulated
      })

      const populatedNotifs = await Promise.all(populatedNotifsPromise)
      return populatedNotifs
    } catch (e) {
      this.logger.log(e)
      throw new InternalServerErrorException(e)
    }
  }

  async createNotification({
    targetId,
    targetUserId,
    type,
  }: {
    targetId: string
    targetUserId: string
    type: NotificationType
  }): Promise<Notification> {
    try {
      const user = await this.usersService.findOneByUserId(targetUserId)

      const notif = new Notification()
      notif.target = targetId
      notif.targetUser = user
      notif.type = type

      await this.notificationsRepository.save(notif)

      return notif
    } catch (e) {
      this.logger.log(e)
      throw new InternalServerErrorException(e)
    }
  }
}
