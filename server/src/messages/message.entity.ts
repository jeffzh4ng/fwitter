import { Field, ObjectType } from '@nestjs/graphql'
import { Class } from 'src/classes/class.entity'
import { User } from 'src/users/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'

@ObjectType()
@Entity('messages')
export class Message {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field({ nullable: true })
  @ManyToOne(type => User, { cascade: false, eager: true })
  @JoinColumn() // generates a FK ref to users.id
  user: User

  @Field()
  @ManyToOne(type => Class, { cascade: false, eager: true })
  @JoinColumn() // generates a FK ref to classes.id
  class: Class

  @Field()
  @Column()
  text: string
}
