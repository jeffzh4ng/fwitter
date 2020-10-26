import { Field, ObjectType } from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity('classes')
export class Class {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  subject: string

  @Field()
  @Column()
  code: string

  @Field()
  @Column()
  name: string
}
