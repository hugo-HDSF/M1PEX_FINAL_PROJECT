import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class LoginUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
