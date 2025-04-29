// src/order/order.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CartService } from 'src/cart/cart.service'; // Ensure this import is correct
import { CreateOrderDto } from './create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly cartService: CartService,
  ) {}

  // Create order from cart items
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, totalPrice, paymentMethod, deliveryAddress } = createOrderDto;

    const cartItems = await this.cartService.findByUser(userId);
    if (!cartItems || cartItems.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    const order = new Order();
    order.user = { id: userId } as any;
    order.totalPrice = totalPrice;
    order.status = 'pending'; // Set order status to pending initially
    order.paymentMethod = paymentMethod;
    order.deliveryAddress = deliveryAddress;

    const savedOrder = await this.orderRepository.save(order);

    for (const cartItem of cartItems) {
      const orderItem = new OrderItem();
      orderItem.order = savedOrder;
      orderItem.menu = cartItem.menu;
      orderItem.quantity = cartItem.quantity;
      orderItem.price = cartItem.menu.price;
      await this.orderItemRepository.save(orderItem);
    }

    await this.cartService.clearCart(userId);

    return savedOrder;
  }

  // Add the method findOrdersByUser to fetch orders by user ID
  async findOrdersByUser(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['orderItems', 'orderItems.menu'],
    });
  }
}
