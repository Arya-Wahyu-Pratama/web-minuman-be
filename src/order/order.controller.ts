// src/order/order.controller.ts
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './create-order.dto';

@Controller('order') // Pastikan path sesuai dengan yang diminta
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':userId') // Route untuk membuat pesanan berdasarkan userId
  async createOrder(
    @Param('userId') userId: number, // Menangkap userId dari URL
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.createOrder({ ...createOrderDto, userId });
  }

  @Get(':userId')
  async findOrdersByUser(@Param('userId') userId: number) {
    return this.orderService.findOrdersByUser(userId);
  }
}
