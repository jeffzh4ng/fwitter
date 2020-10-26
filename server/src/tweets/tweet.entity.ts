import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/users/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'

@ObjectType()
@Entity('tweets')
export class Tweet {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  @ManyToOne(type => User, { cascade: false, eager: true })
  @JoinColumn() // generates a FK ref to users.id
  user: User

  @Field()
  @Column()
  text: string
}
