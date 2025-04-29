import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({ example: 'Teh Manis' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 'Teh dari pengunungan alpen' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https://img-global.cpcdn.com/recipes/2063fe80e7ba33d9/640x640sq70/photo.jpg' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
