import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity'; 
import { Menu } from 'src/menu/menu.entity';

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
  price: number;
}
