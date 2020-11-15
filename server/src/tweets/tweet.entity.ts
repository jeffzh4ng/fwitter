import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { GraphQLBoolean, GraphQLID } from 'graphql'
import { User } from 'src/users/user.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'
import { Like } from './like.entity'

export enum TweetType {
  REGULAR = 'regular',
  REPLY = 'reply',
  RETWEET = 'retweet',
}

registerEnumType(TweetType, {
  name: 'TweetType',
})

@ObjectType()
@Entity('tweets')
export class Tweet {
  @Field(GraphQLID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({
    type: 'enum',
    enum: TweetType,
    default: TweetType.REGULAR,
  })
  type: TweetType

  @Field({ nullable: true })
  @ManyToOne(
    type => Tweet,
    tweet => tweet.children
  )
  parent: Tweet

  @Field(type => [Tweet])
  @OneToMany(
    type => Tweet,
    tweet => tweet.parent
  )
  children: Tweet[]

  @Field()
  @ManyToOne(type => User, { cascade: false, eager: true })
  @JoinColumn() // generates a FK ref to users.id
  user: User

  @Field(type => [Like])
  @OneToMany(
    () => Like,
    like => like.tweet
  )
  likes: Like[]

  @Field()
  @Column({ nullable: true, length: 180 }) // TODO: fix issue with synchronize: true
  text: string

  @Field()
  @CreateDateColumn()
  createdAt: Date
}
