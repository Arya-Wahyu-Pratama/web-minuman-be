import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cart } from 'src/cart/cart.entity'; 
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

  @OneToMany(() => Cart, (cart) => cart.menu)
  carts: Cart[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.menu)
  orderItems: OrderItem[];
}
