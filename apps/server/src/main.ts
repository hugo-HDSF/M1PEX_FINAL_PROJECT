import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	await app.listen(process.env.SERVER_PORT!);
	
	console.log(`Application is running on: ${await app.getUrl()}`);
	
}
bootstrap();
