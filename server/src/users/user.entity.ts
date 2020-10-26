import { Field, ObjectType } from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  thirdPartyId: string

  @Column()
  provider: string

  @Field()
  @Column({ unique: true })
  username: string
}
