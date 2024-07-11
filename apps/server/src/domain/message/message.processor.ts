import { Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from '$prisma/prisma.service';
import { PubSub } from 'graphql-subscriptions';

@Processor('messages')
export class MessageProcessor {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  private readonly logger = new Logger(MessageProcessor.name);

  @Process('createMessage')
  async createMessage(job: Job) {
    this.logger.debug('Start creating message...');

    const newMessage = await this.prisma.message.create({
      data: {
        content: job.data.content,
        user: {
          connect: { id: job.data.userId },
        },
        discussion: {
          connect: { id: job.data.discussionId },
        },
      },
    });

    await this.pubSub.publish('messageAdded', {messageAdded: newMessage});

    this.logger.debug('Message created!', {
      newMessage,
    });
  }
}
