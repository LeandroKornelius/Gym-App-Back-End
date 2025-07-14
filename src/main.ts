import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Fit-App API')
    .setDescription('The Fit-App API routes and functionality descriptions')
    .setVersion('1.0')
    .addBearerAuth()

    // These tags separate related routes into categories for easier use of the swagger
    .addTag('Authentication')
    .addTag('Users')
    .addTag('Exercises')
    .addTag('Workouts')

    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
