import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';
import { Discussion } from './discussion.entity';

@ObjectType()
export class Message {
  @Field(() => String)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => User)
  user: User;

  @Field(() => Discussion)
  discussion: Discussion;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
