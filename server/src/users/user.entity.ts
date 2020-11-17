import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLID } from 'graphql'
import { Follow } from 'src/follows/follow.entity'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'

@ObjectType()
@Entity('users')
export class User {
  @Field(GraphQLID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column({ nullable: true })
  bio: string

  @Field()
  @Column({ nullable: true })
  website: string

  @Field()
  @Column({ nullable: true })
  avatarUrl: string

  @CreateDateColumn()
  date: Date

  @OneToMany(
    type => Follow,
    follow => follow.user
  )
  following: Follow[]

  @OneToMany(
    type => Follow,
    follow => follow.target
  )
  followers: Follow[]

  @Field()
  @CreateDateColumn()
  createdAt: Date
}

export type StrippedUser = Omit<User, 'password'>
