import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity("user_addresses")
export class UserAddress {
  @ApiProperty({ description: "Productning noyob IDsi " })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Product nomi", example: "Oq classik devan" })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ description: "country", example: "Uzbekiston" })
  @Column({ nullable: true })
  country: string;

  @ApiProperty({ description: "shahar", example: "Tashkent" })
  @Column({ nullable: true })
  city: string;

  @ApiProperty({
    description: "yashash joyi, kvartira",
    example: "dom",
  })
  @Column({ nullable: true })
  apartment: string;

  @ApiProperty({ description: "Ko'cha nomi", example: "Bog'ston" })
  @Column({ nullable: true })
  street: string;

  @ApiProperty({
    description: "manzil pochta raqami",
    example: "100092 for Chilonzor tumani",
  })
  @Column({ nullable: true })
  postal_code: string;

  @ApiProperty({
    description: "hozir faoliyat olib bormoqdami",
    example: "true",
  })
  @Column({ default: true })
  is_default: boolean;

  @ApiProperty({
    description: "Ma'lumot birinchi kiritilgan vaqt",
    example: "2025-05-29T10:30:00Z",
  })
  @CreateDateColumn({ type: "timestamp" })
  create_at: Date;

  @ManyToOne(() => User, (user) => user.addresses)
  @ApiProperty({
    type: () => User,
    description: "Manzil egalari (foydalanuvchi)",
  })
  user: User;
}
