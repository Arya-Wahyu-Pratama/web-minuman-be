import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Menu } from '../menu/menu.entity';
import { User } from '../user/user.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { AuthModule } from '../auth/auth.module'; // untuk akses JwtService

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Menu, User]),
    AuthModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
