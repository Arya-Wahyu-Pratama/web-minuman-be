import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT') || 5432,
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: ['dist/migrations/*.js'],
        autoLoadEntities: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    AuthModule,
    UserModule,
    MenuModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    JwtService,
    { provide: APP_GUARD, useClass: AuthGuard },
    AppService,
  ],
})
export class AppModule {}
