// src/order/order.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column()
  totalPrice: number;

  @Column()
  status: string; // status seperti "pending", "completed", dll

  @Column({ nullable: true })  // Menambahkan field paymentMethod
  paymentMethod: string;  // Misalnya: 'credit card', 'paypal', dll.

  @Column()
  deliveryAddress: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
