import { createUnionType, Field, ObjectType } from '@nestjs/graphql'
import { GraphQLID } from 'graphql'
import { Follow } from 'src/follows/follow.entity'
import { Like } from 'src/tweets/like.entity'
import { Tweet } from 'src/tweets/tweet.entity'
import { User } from 'src/users/user.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm'

export enum NotificationType {
  LIKE = 'like',
  TWEET = 'tweet',
  FOLLOW = 'follow',
}

const TargetUnion = createUnionType({
  name: 'NotificationTarget',
  types: () => [Like, Tweet, Follow],
})

@ObjectType()
@Entity('notifications')
export class Notification {
  @Field(GraphQLID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @ManyToOne(type => User, { cascade: false, eager: true })
  @JoinColumn() // generates a FK ref to users.id
  targetUser: User

  @Field(type => TargetUnion)
  @Column('uuid')
  target: String

  @Field()
  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType

  @Field()
  @CreateDateColumn()
  createdAt: Date
}
