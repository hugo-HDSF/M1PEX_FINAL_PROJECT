import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';

import { PrismaService } from '$prisma/prisma.service';
import { GqlAuthGuard } from '@guards/gql-auth.guard';
import { User } from '@entities/user.entity';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Discussion } from '@entities/discussion.entity';

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly prisma: PrismaService) {
	}
	
	private readonly logger = new Logger(UserResolver.name);
	
	@UseGuards(GqlAuthGuard)
	@Query(() => [User], {name: 'users'})
	findAll() {
		return this.prisma.user.findMany();
	}
	
	@UseGuards(GqlAuthGuard)
	@Query(() => User, {name: 'user'})
	findOne(@Args('id', {type: () => String}) id: string) {
		return this.prisma.user.findUnique({
			where: {id},
		});
	}
	
	@UseGuards(GqlAuthGuard)
	@Mutation(() => User)
	createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
		return this.prisma.user.create({data: createUserInput});
	}
	
	@UseGuards(GqlAuthGuard)
	@Mutation(() => User)
	updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
		return this.prisma.user.update({
			where: {id: updateUserInput.id},
			data: updateUserInput,
		});
	}
	
	@UseGuards(GqlAuthGuard)
	@Mutation(() => User)
	removeUser(@Args('id', {type: () => String}) id: string) {
		return this.prisma.user.delete({where: {id}});
	}
}
