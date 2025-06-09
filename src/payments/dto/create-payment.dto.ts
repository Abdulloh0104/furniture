import { ApiProperty } from "@nestjs/swagger";
import { Order } from "../../orders/entities/order.entity";
import { IsNumber, IsOptional, IsString } from "class-validator";
export class CreatePaymentDto {
  @IsNumber()
  @ApiProperty({
    description: "amount",
    example: "25",
  })
  amount: number;

  @IsString()
  @ApiProperty({ description: "To'lov holati", example: "cash" })
  method: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "full name", example: "John K" })
  billing_full_name: string;

  @ApiProperty({ description: "address", example: "London" })
  billing_address: string;

  @IsString()
  status: string;

  order: Order;
}
