import { Module } from '@nestjs/common';
import { PrismaModule } from '$prisma/prisma.module';
import { DiscussionResolver } from './discussion.resolver';

@Module({
  imports: [PrismaModule],
  providers: [DiscussionResolver],
})
export class DiscussionModule {}
