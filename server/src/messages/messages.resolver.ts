import { Resolver, Query, Args, Mutation, Context, Subscription } from '@nestjs/graphql'
import { Message } from './message.entity'
import { MessagesService } from './messages.service'
import { GraphQLInt } from 'graphql'
import { UseGuards } from '@nestjs/common'
import { GraphqlAuthGuard } from 'src/guards/auth.guard'
import { PubSub } from 'graphql-subscriptions'

const pubSub = new PubSub() // TODO: default implementation not suitable for prod, must use external store like redis

@Resolver(of => Message)
export class MessagesResolver {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(GraphqlAuthGuard)
  @Query(returns => [Message], { name: 'messages' })
  // TODO: change to class name instead of id
  async getMessages(@Args('classId', { type: () => GraphQLInt }) classId: number) {
    const messages = await this.messagesService.findAll(classId)
    return messages
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(returns => Message)
  async createMessage(
    @Context() ctx: any,
    @Args('classId', { type: () => GraphQLInt }) classId: number, // TODO: change to class name instead of id
    @Args('text', { type: () => String }) text: string
  ) {
    const { thirdPartyId } = ctx.req.session
    const message = await this.messagesService.createMessage({ thirdPartyId, classId, text })
    pubSub.publish('messageCreated', { messageCreated: message })

    return message
  }

  // @UseGuards(GraphqlAuthGuard) TODO: fix auth with subscriptions, rn req is undefined in the guard
  @Subscription(returns => Message, {
    name: 'messageCreated',
    filter: (payload, variables) => {
      return payload.messageCreated.class.id === variables.classId
    },
  })
  createMessageHandler(@Args('classId', { type: () => GraphQLInt }) classId: number) {
    return pubSub.asyncIterator('messageCreated')
  }
}
