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
} from 'typeorm'

@ObjectType()
@Entity('tweets')
export class Tweet {
  @Field(GraphQLID)
  @PrimaryGeneratedColumn()
  id: number

  @Field({ nullable: true })
  @ManyToOne(type => User, { cascade: false, eager: true })
  @JoinColumn() // generates a FK ref to users.id
  user: User

  @Field()
  @Column()
  text: string

  @CreateDateColumn()
  date: Date
}
