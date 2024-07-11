import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field()
  access_token: string;
  
  @Field()
  id: string;
  
  @Field()
  email: string;
  
  @Field()
  username: string;
  
  @Field()
  phoneNumber: string;
}
