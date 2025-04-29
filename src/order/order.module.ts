// src/order/order.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CartModule } from 'src/cart/cart.module'; // Mengimpor CartModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    CartModule, // Pastikan CartModule diimpor untuk mengakses CartService
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
