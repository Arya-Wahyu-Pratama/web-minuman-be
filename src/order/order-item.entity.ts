// src/order/order-item.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity'; // Ensure the Order entity is imported
import { Menu } from 'src/menu/menu.entity'; // Ensure the Menu entity is imported

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Menu, (menu) => menu.orderItems, { onDelete: 'CASCADE' })
  menu: Menu;

  @Column()
  quantity: number;

  @Column()
  price: number; // Harga per item
}
