import { Field, ObjectType } from '@nestjs/graphql'
import { Follow } from 'src/follows/follow.entity'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'

@ObjectType()
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @CreateDateColumn()
  date: Date

  @OneToMany(
    type => Follow,
    follow => follow.follower
  )
  following: Follow[]

  @OneToMany(
    type => Follow,
    follow => follow.followee
  )
  followers: Follow[]
}
