// src/cart/cart.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CreateCartDto } from './create-cart.dto';
import { UpdateCartDto } from './update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const { quantity, menuId, userId } = createCartDto;

    if (!menuId || !userId) {
      throw new BadRequestException('menuId dan userId wajib diisi.');
    }

    const cart = this.cartRepository.create({
      quantity,
      userId,
      menu: { id: menuId } as any,
    });

    return this.cartRepository.save(cart);
  }

  async findByUser(userId: number): Promise<Cart[]> {
    return this.cartRepository.find({
      where: { userId },
      relations: ['menu'],
    });
  }

  async updateQuantity(updateCartDto: UpdateCartDto): Promise<Cart> {
    const { userId, menuId, quantity } = updateCartDto;

    const cartItem = await this.cartRepository.findOne({
      where: { userId, menu: { id: menuId } },
      relations: ['menu'],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item tidak ditemukan.');
    }

    cartItem.quantity = quantity;
    return this.cartRepository.save(cartItem);
  }

  async remove(userId: number, menuId: number): Promise<void> {
    const cartItem = await this.cartRepository.findOne({
      where: { userId, menu: { id: menuId } },
      relations: ['menu'],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item tidak ditemukan.');
    }

    await this.cartRepository.remove(cartItem);
  }

  async clearCart(userId: number): Promise<void> {
    await this.cartRepository.delete({ userId });
  }
}
