import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLID } from 'graphql'
import { User } from 'src/users/user.entity'
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm'
import { Tweet } from './tweet.entity'

@ObjectType()
@Entity('likes')
export class Like {
  @Field(GraphQLID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @ManyToOne(type => User, { cascade: false, eager: true })
  @JoinColumn() // generates a FK ref to users.id
  user: User

  @ManyToOne(type => Tweet, { cascade: false, eager: true })
  @JoinColumn()
  tweet: Tweet

  @Field()
  @CreateDateColumn()
  createdAt: Date
}
