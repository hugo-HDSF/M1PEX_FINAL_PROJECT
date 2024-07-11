import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';
import { Message } from './message.entity';

@ObjectType()
export class Discussion {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [User], { nullable: true })
  users?: User[];

  @Field(() => [Message], { nullable: true })
  messages?: Message[];

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
