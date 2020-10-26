import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ClassesService } from 'src/classes/classes.service'
import { UsersService } from 'src/users/users.service'
import { Connection, Repository } from 'typeorm'
import { Message } from './message.entity'

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name)

  constructor(
    private connection: Connection,
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
    private usersService: UsersService,
    private classesService: ClassesService
  ) {}

  async findAll(classId: number): Promise<Array<Message>> {
    try {
      const messages = await this.messagesRepository.find({ where: { class: { id: classId } } })
      return messages
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }

  async createMessage(data: {
    thirdPartyId: string
    classId: number
    text: string
  }): Promise<Message> {
    try {
      const { thirdPartyId, classId, text } = data

      const user = await this.usersService.findOne(thirdPartyId)
      const c = await this.classesService.findOne(classId)

      const message = new Message()
      message.user = user
      message.class = c
      message.text = text

      await this.connection.manager.save(message)

      return message // TODO: is this returning an id too, according to the Message type? does connection manager mutate message?
    } catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException()
    }
  }
}
