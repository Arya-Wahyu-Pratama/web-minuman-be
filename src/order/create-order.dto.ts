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
  paymentMethod: string;

  @IsString()
  @IsNotEmpty()
  deliveryAddress: string;
}
