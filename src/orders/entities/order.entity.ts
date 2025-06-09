import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { v4 as uuidv4 } from "uuid";
import { Payment } from "../../payments/entities/payment.entity";
import { OrderItem } from "../../order_items/entities/order_item.entity";

@Entity("order")
export class Order {
  @ApiProperty({ description: "Productning noyob IDsi " })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "order raqami", example: "rfrj8578439" })
  @Column({
    type: "uuid",
    default: () => `'${uuidv4()}'`, // <-- DIQQAT: bu yerda funksiyani string sifatida SQL-ga uzatyapti
  })
  order_number: string;

  @ApiProperty({ description: "Buyurtma holati", example: "pending" })
  @Column({
    type: "enum",
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  })
  status: string;

  @ApiProperty({
    description: "Bebellarning umumiy narxi",
    example: "25",
  })
  @Column({
    type: "decimal",
  })
  subtotal: number;

  @ApiProperty({
    description: "yetkazib berish narxi",
    example: "25",
  })
  @Column({
    type: "decimal",
  })
  shipping_cost: number;

  @ApiProperty({
    description: "Jami narxi",
    example: "50",
  })
  @Column({
    type: "decimal",
  })
  total_amount: number;

  @ApiProperty({ description: "valyuta turi", example: "USD" })
  @Column({ default: "USD" })
  currency: string;

  @ApiProperty({ description: "Yetkazib berish turi", example: "pickup" })
  @Column({
    default: "courier",
  })
  delivery_method: string;

  @ApiProperty({
    description: "yetkazib berilgan vaqt",
    example: "2025-05-29",
  })
  @Column()
  delivery_date: Date;

  @ApiProperty({ description: "Info", example: "Great" })
  @Column({
    default: "courier",
  })
  notes: string;

  @ApiProperty({
    description: "Ma'lumot birinchi kiritilgan vaqt",
    example: "2025-05-29T10:30:00Z",
  })
  @CreateDateColumn({ type: "timestamp" })
  create_at: Date;

  @ApiProperty({
    description: "Ma'lumot so'ngi o'zgartirilgan vaqt",
    example: "2025-05-29T10:30:00Z",
  })
  @UpdateDateColumn({ type: "timestamp" })
  update_at: Date;

  @ApiProperty({
    type: () => User,
    description: "Buyurtmachining foydalanuvchi ma'lumotlari",
  })
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ApiProperty({
    type: () => [Payment],
    description: "Buyurtmaga tegishli to'lovlar",
  })
  @OneToMany(() => Payment, (paymet) => paymet.order)
  payments: Payment[];

  @ApiProperty({ type: () => [OrderItem], description: "Buyurtma elementlari" })
  @OneToMany(() => OrderItem, (i) => i.order)
  order_items: OrderItem[];
}
