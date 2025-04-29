import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './create-order.dto';

@Controller('order') 
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':userId') 
  async createOrder(
    @Param('userId') userId: number, 
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.createOrder({ ...createOrderDto, userId });
  }

  @Get(':userId')
  async findOrdersByUser(@Param('userId') userId: number) {
    return this.orderService.findOrdersByUser(userId);
  }
}
