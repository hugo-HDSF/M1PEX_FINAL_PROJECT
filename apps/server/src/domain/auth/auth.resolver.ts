import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreateUserInput } from '@user/dto/create-user.input';
import { User } from '@entities/user.entity';
import { LocalAuthGuard } from '@guards/local-auth.guard';
import { PrismaService } from '$prisma/prisma.service';

import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth-response.dto';
import { LoginUserInput } from './dto/login-user.input.dto';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}
  
  @Mutation(() => AuthResponse)
  async login(
    @Args() loginUserInput: LoginUserInput,
  ): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserInput.email },
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Mutation(() => User)
  async register(
    @Args('registerUserInput') registerUserInput: CreateUserInput,
  ): Promise<User> {
    return this.authService.register(registerUserInput);
  }
}
