import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLID } from 'graphql'
import { User } from 'src/users/user.entity'
import { Entity, ManyToOne, CreateDateColumn, PrimaryColumn } from 'typeorm'

@ObjectType()
@Entity('follows')
export class Follow {
  @Field()
  @PrimaryColumn(GraphQLID)
  id: number

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.following
  )
  follower: User

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.followers
  )
  followee: User

  @CreateDateColumn()
  date: Date
}
