import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Menu } from 'src/menu/menu.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Menu, (menu) => menu.carts)
  menu: Menu;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @Column()
  userId: number; // Tetap butuh userId untuk query cepat
}
