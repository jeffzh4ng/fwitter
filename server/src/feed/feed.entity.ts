import { Field, ObjectType } from '@nestjs/graphql'
import { Tweet } from 'src/tweets/tweet.entity'

@ObjectType()
export class Feed {
  @Field()
  tweets: Array<Tweet>
}
