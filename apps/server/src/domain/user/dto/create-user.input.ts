import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field(() => String)
  username: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString()
  @Field(() => String)
  password: string;
  
  @IsString()
  @IsPhoneNumber()
  @Field(() => String)
  phoneNumber: string;
}
