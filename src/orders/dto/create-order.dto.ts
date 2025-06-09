import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities/user.entity";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: "order raqami", example: "rfrj8578439" })
  order_number: string;

  @IsString()
  @ApiProperty({ description: "Buyurtma holati", example: "pending" })
  status: string;

  @IsNumber()
  @ApiProperty({
    description: "Bebellarning umumiy narxi",
    example: "25",
  })
  subtotal: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: "yetkazib berish narxi",
    example: "25",
  })
  shipping_cost: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: "Jami narxi",
    example: "50",
  })
  total_amount: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "valyuta turi", example: "USD" })
  currency: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "Yetkazib berish turi", example: "pickup" })
  delivery_method: string;

  @ApiProperty({
    description: "yetkazib berilgan vaqt",
    example: "2025-05-29",
  })
  delivery_date: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "Info", example: "Great" })
  notes: string;


  @ApiProperty({
    description: "Buyurtmachining ma'lumotlari",
    example: 1,
  })
  user: User;
}
