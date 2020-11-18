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
@Entity('mentions')
export class Mention {
  @Field(GraphQLID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Tweet, { cascade: false, eager: true })
  @JoinColumn()
  tweet: Tweet

  @Column({ nullable: true })
  tag: string

  @Field()
  @ManyToOne(type => User, { cascade: false, eager: true })
  @JoinColumn() // generates a FK ref to users.id
  user: User

  @Field()
  @CreateDateColumn()
  createdAt: Date
}
