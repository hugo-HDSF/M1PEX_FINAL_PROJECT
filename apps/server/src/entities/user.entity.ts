import { ObjectType, Field } from '@nestjs/graphql';
import { Message } from './message.entity';
import { Discussion } from './discussion.entity';

@ObjectType()
export class User {
  @Field(() => String)
  id: string;
  
  @Field(() => String)
  phoneNumber: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => [Message], { nullable: true })
  messages?: Message[];

  @Field(() => [Discussion], { nullable: true })
  discussions?: Discussion[];
}
