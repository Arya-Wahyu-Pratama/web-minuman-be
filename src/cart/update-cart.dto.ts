// src/cart/update-cart.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCartDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  menuId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
