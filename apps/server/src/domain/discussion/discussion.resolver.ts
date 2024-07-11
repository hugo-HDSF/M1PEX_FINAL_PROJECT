import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '$prisma/prisma.service';
import { GqlAuthGuard } from '@guards/gql-auth.guard';
import { Logger, UseGuards } from '@nestjs/common';
import { Discussion } from '@entities/discussion.entity';
import { CreateDiscussionInput } from './dto/create-discussion.input';

@Resolver()
export class DiscussionResolver {
	constructor(private readonly prisma: PrismaService) {
	}
	
	private readonly logger = new Logger(DiscussionResolver.name);
	
	@UseGuards(GqlAuthGuard)
	@Query(() => [Discussion], {name: 'discussions'})
	findAll() {
		return this.prisma.discussion.findMany();
	}
	
	@UseGuards(GqlAuthGuard)
	@Query(() => Discussion, {name: 'discussion'})
	findOne(id: string) {
		return this.prisma.discussion.findUnique({
			where: {id},
		});
	}
	
	@UseGuards(GqlAuthGuard)
	@Query(() => [Discussion], {name: 'discussionsByUser'})
	findDiscussionsByUser(@Args('id', {type: () => String}) id: string) {
		return this.prisma.discussion.findMany({
			where: {
				users: {
					some: {
						id,
					},
				},
			},
			include: {
				users: true,
			},
		});
	}
	
	@UseGuards(GqlAuthGuard)
	@Mutation(() => Discussion, {name: 'createDiscussion'})
	createDiscussion(@Args('createDiscussionInput') createDiscussionInput: CreateDiscussionInput) {
		return this.prisma.discussion.create({
			data: {
				name: createDiscussionInput.name,
				users: {
					connect: createDiscussionInput.users?.map((id) => ({id})),
				},
			},
		});
	}
}
