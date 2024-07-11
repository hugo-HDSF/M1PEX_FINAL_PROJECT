import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';
import { PrismaModule } from '$prisma/prisma.module';
import { UserModule } from '@user/user.module';
import { BullModule } from '@nestjs/bullmq';
import { AuthModule } from '@auth/auth.module';
import { MessageModule } from '@message/message.module';
import { DiscussionModule } from '@discussion/discussion.module';


@Module({
	imports: [
		ConfigModule.forRoot(),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			sortSchema: true,
			context: ({req}) => ({req}),
			subscriptions: {
				'graphql-ws': true
			},
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'static'),
			serveRoot: '/static',
		}),
		BullModule.forRoot({
			connection: {
				host: 'localhost',
				port: 6379,
			},
		}),
		PrismaModule,
		UserModule,
		AuthModule,
    MessageModule,
    DiscussionModule,
	]
})
export class AppModule {
}
