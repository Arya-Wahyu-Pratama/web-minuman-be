// src/cart/cart.controller.ts
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './create-cart.dto';
import { UpdateCartDto } from './update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    const cart = await this.cartService.create(createCartDto);
    return { message: 'Item berhasil ditambahkan ke keranjang', data: cart };
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: number) {
    const carts = await this.cartService.findByUser(userId);
    return { message: 'Daftar keranjang', data: carts };
  }

  @Patch()
  async updateQuantity(@Body() updateCartDto: UpdateCartDto) {
    const updated = await this.cartService.updateQuantity(updateCartDto);
    return { message: 'Quantity berhasil diperbarui', data: updated };
  }

  @Delete(':userId/:menuId')
  async remove(@Param('userId') userId: number, @Param('menuId') menuId: number) {
    await this.cartService.remove(userId, menuId);
    return { message: 'Item berhasil dihapus dari keranjang' };
  }

  @Delete('clear/:userId')
  async clearCart(@Param('userId') userId: number) {
    await this.cartService.clearCart(userId);
    return { message: 'Semua item di keranjang berhasil dihapus' };
  }
}
