import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PrismaModule } from '$prisma/prisma.module';
import { MessageResolver } from './message.resolver';
import { MessageProcessor } from './message.processor';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Module({
  imports: [PrismaModule, BullModule.registerQueue({ name: 'messages' })],
  providers: [
    MessageResolver,
    MessageProcessor,
    { provide: 'PUB_SUB', useValue: pubSub },
  ],
})
export class MessageModule {}
