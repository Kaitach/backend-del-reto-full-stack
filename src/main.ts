import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {


  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://banko-de-sofka.web.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
  app.enableCors({
    origin: 'https://banko-de-sofka.web.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });
  await app.listen(3000);
}
bootstrap();
