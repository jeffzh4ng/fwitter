import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLID } from 'graphql'
import { User } from 'src/users/user.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Column,
} from 'typeorm'
import { Tweet } from './tweet.entity'

@ObjectType()
@Entity('hashtags')
export class Hashtag {
  @Field(GraphQLID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Tweet, { cascade: false, eager: true })
  @JoinColumn()
  tweet: Tweet

  @Field()
  @Column()
  tag: string

  @Field()
  @CreateDateColumn()
  createdAt: Date
}
