import { ObjectType } from '@nestjs/graphql'
import { GraphQLID } from 'graphql'
import { User } from 'src/users/user.entity'
import { Entity, ManyToOne, CreateDateColumn, PrimaryColumn } from 'typeorm'

@ObjectType()
@Entity('follows')
export class Follow {
  @PrimaryColumn(GraphQLID)
  id: number

  @ManyToOne(
    type => User,
    user => user.following
  )
  follower: User

  @ManyToOne(
    type => User,
    user => user.followers
  )
  followee: User

  @CreateDateColumn()
  date: Date
}
