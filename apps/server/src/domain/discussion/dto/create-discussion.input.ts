import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateDiscussionInput {
  @IsString()
  @Field(() => String)
  name: string;

  @IsString({ each: true })
  @Field(() => [String])
  users?: string[];
}
