import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty({
    description: 'product name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'product description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'product price',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'product main image',
  })
  @IsString()
  mainImage: string;

  @IsString()
  @IsOptional()
  isActive?: boolean;

  static fromPrimitives({
    name,
    description,
    price,
    mainImage,
    isActive,
  }: {
    name: string;
    description: string;
    price: number;
    mainImage: string;
    isActive?: boolean;
  }) {
    const dto = new CreateProductDTO();
    dto.name = name;
    dto.description = description;
    dto.price = price;
    dto.mainImage = mainImage;

    if (isActive) {
      dto.isActive = isActive;
    }

    return dto;
  }
}
