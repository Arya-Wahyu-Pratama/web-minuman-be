import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'https://web-minuman-fe.vercel.app/', // ganti dengan domain frontend kamu
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
   app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('Simple Social Media API')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use('/api/swagger-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });
  app.use('/api/swagger', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>API Docs</title>
          <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
        </head>
        <body>
          <div id="swagger-ui"></div>
          <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
          <script>
            window.onload = function () {
              SwaggerUIBundle({
                url: '/api/swagger-json',
                dom_id: '#swagger-ui',
              });
            };
          </script>
        </body>
      </html>
    `);
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();