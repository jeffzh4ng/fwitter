import { Resolver, Query, Context } from '@nestjs/graphql'
import { NotificationsService } from './notifications.service'
import { Notification } from './notifications.entity'

@Resolver(of => Notification)
export class NotificationsResolver {
  constructor(private notificationsService: NotificationsService) {}

  @Query(returns => [Notification])
  async getNotifications(@Context() ctx: any) {
    const { userId } = ctx.req.session

    return this.notificationsService.getNotifications(userId)
  }
}
