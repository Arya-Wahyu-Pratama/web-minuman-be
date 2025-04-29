// src/order/create-order.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;  // Menambahkan paymentMethod di DTO

  @IsString()
  @IsNotEmpty()
  deliveryAddress: string;
}
