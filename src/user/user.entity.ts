// src/user/user.entity.ts
import { Cart } from 'src/cart/cart.entity';
import { Order } from 'src/order/order.entity'; // <-- pastikan Order diimpor dengan benar
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column()
  profile_picture: string;

  @Column()
  bio: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relasi ke Cart
  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  // Relasi ke Order
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]; // <-- relasi ke entitas Order
}
