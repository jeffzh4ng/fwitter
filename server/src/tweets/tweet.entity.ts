import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLID } from 'graphql'
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

@ObjectType()
@Entity('tweets')
export class Tweet {
  @Field(GraphQLID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @ManyToOne(type => User, { cascade: false, eager: true })
  @JoinColumn() // generates a FK ref to users.id
  user: User

  @OneToMany(
    () => Like,
    like => like.tweet
  )
  likes: Like[]

  @Field()
  @Column({ nullable: true })
  text: string

  @Field()
  @CreateDateColumn()
  createdAt: Date
}
