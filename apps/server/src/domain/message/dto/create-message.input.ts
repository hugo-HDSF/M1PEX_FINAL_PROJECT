import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @IsString()
  @Field(() => String)
  content: string;

  @IsString()
  @Field(() => String)
  userId: string;

  @IsString()
  @Field(() => String)
  discussionId: string;
}
