import { Message } from '@entities/message.entity';
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PrismaService } from '$prisma/prisma.service';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@guards/gql-auth.guard';
import { CreateMessageInput } from './dto/create-message.input';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => Message)
export class MessageResolver {
	constructor(
		private readonly prisma: PrismaService,
		@InjectQueue('messages') private readonly messagesQueue: Queue,
		@Inject('PUB_SUB') private readonly pubSub: PubSub,
	) {
	}
	
	@UseGuards(GqlAuthGuard)
	@Query(() => [Message], {name: 'messages'})
	findAll() {
		return this.prisma.message.findMany({
			include: {
				user: true,
				discussion: true,
			},
		});
	}
	
	@UseGuards(GqlAuthGuard)
	@Query(() => [Message], {name: 'messagesByDiscussionAsc'})
	async findMessagesByDiscussionAsc(@Args('discussionId', {type: () => String}) discussionId: string) {
		const data = await this.prisma.message.findMany({
			where: {
				discussionId,
			},
			include: {
				user: true,
				discussion: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		console.log(data);
		return data;
	}
	
	@UseGuards(GqlAuthGuard)
	@Subscription(() => Message, {
		filter: (payload, variables) =>
			payload.messageAdded.discussion.id === variables.discussionId,
	})
	messageAdded(@Args('discussionId') discussionId: string) {
		return this.pubSub.asyncIterator('messageAdded');
	}
	
	@UseGuards(GqlAuthGuard)
	@Mutation(() => Message)
	createMessage(
		@Args('createMessageInput') createMessageInput: CreateMessageInput,
	) {
		const placeholderMessage = {
			id: Math.random().toString(),
			content: createMessageInput.content,
		};
		
		this.messagesQueue.add('createMessage', createMessageInput);
		
		return placeholderMessage;
	}
}
