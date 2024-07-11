import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { PrismaModule } from '$prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserResolver],
})
export class UserModule {}
