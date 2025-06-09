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
import { v4 as uuidv4 } from "uuid";
import { UserAddress } from "../../user_addresses/entities/user_address.entity";
import { User } from "../../users/entities/user.entity";
import { CartItem } from "../../cart_items/entities/cart_item.entity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "rr44",
    description: "tasodifiy id",
  })
  @Column({
    nullable: true,
    // type: "uuid",
    // default: () => `'${uuidv4()}'`, // <-- DIQQAT: bu yerda funksiyani string sifatida SQL-ga uzatyapti
  })
  session_id?: string;

  @ApiProperty({
    description: "Ma'lumot birinchi kiritilgan vaqt",
    example: "2025-05-29T10:30:00Z",
  })
  @CreateDateColumn({ type: "timestamp" })
  create_at: Date;

  @ApiProperty({
    description: "Oxirgi ilgan vaqt",
    example: "2025-05-29T10:30:00Z",
  })
  @UpdateDateColumn({ type: "timestamp" })
  update_at: Date;

  @ApiProperty({
    type: () => User,
    description: "Foydalanuvchiga tegishli savat",
  })
  @ManyToOne(() => User, (user) => user.carts, { nullable: true })
  user: User;

  @ApiProperty({ type: () => [CartItem], description: "Savatdagi mahsulotlar" })
  @OneToMany(() => CartItem, (product) => product.cart)
  cart_items: CartItem[];
}
