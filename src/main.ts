import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir el acceso a la documentación Swagger
  app.enableCors({
    origin: ['https://banko-de-sofka.web.app', 'http://localhost:4200'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configuración del documento Swagger
  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Descripción de mi API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Configuración de la ruta para acceder a la documentación Swagger
  SwaggerModule.setup('api', app, document);

  // Configuración adicional del servidor
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://banko-de-sofka.web.app, http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  await app.listen(3000);
}
bootstrap();
