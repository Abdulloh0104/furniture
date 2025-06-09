import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "../../orders/entities/order.entity";

@Entity()
export class Payment {
  @ApiProperty({ description: "Productning noyob IDsi " })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "amount",
    example: "25",
  })
  @Column({
    type: "decimal",
  })
  amount: number;

  @ApiProperty({ description: "To'lov holati", example: "cash" })
  @Column({
    type: "enum",
    enum: ["cash", "online"],
    default: "online",
  })
  method: string;

  @ApiProperty({ description: "full name", example: "John K" })
  @Column({
    default: "Smith",
  })
  billing_full_name: string;

  @ApiProperty({ description: "address", example: "London" })
  @Column({
    default: "London",
  })
  billing_address: string;

  @ApiProperty({
    description: "Ma'lumot birinchi kiritilgan vaqt",
    example: "2025-05-29T10:30:00Z",
  })
  @CreateDateColumn({ type: "timestamp" })
  create_at: Date;

  @ApiProperty({
    description: "To'lov holati",
    example: "paid",
    default: "paid",
  })
  @Column({
    type: "enum",
    enum: ["cancelled", "partial", "paid"],
    default: "paid",
  })
  status: string;

  @ApiProperty({
    type: () => Order,
    description: "Tolov buyurtmasi",
    example: "stol",
  })
  @ManyToOne(() => Order, (order) => order.payments)
  order: Order;
}
