import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLID } from 'graphql'
import { User } from 'src/users/user.entity'
import { Entity, ManyToOne, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity('follows')
export class Follow {
  @Field(GraphQLID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.following
  )
  user: User

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.followers
  )
  target: User

  @Field()
  @CreateDateColumn()
  createdAt: Date
}
