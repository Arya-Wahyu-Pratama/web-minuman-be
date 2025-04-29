// src/menu/menu.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cart } from 'src/cart/cart.entity'; // Mengimpor entitas Cart
import { OrderItem } from 'src/order/order-item.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  // Relasi OneToMany dengan Cart
  @OneToMany(() => Cart, (cart) => cart.menu)
  carts: Cart[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.menu)
  orderItems: OrderItem[]; // Relation with OrderItem
}
