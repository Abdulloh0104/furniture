import { ApiProperty } from "@nestjs/swagger";
import { Order } from "../../orders/entities/order.entity";
export class CreatePaymentDto {
  @ApiProperty({
    description: "amount",
    example: "25",
  })
  amount: number;

  @ApiProperty({ description: "To'lov holati", example: "cash" })
  method: string;

  @ApiProperty({ description: "full name", example: "John K" })
  billing_full_name: string;

  @ApiProperty({ description: "address", example: "London" })
  billing_address: string;

  status: string;

  order: Order;
}
