import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { UserAddress } from "../../user_addresses/entities/user_address.entity";
import { Cart } from "../../cart/entities/cart.entity";
import { Order } from "../../orders/entities/order.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Aziz",
    description: "user name",
  })
  @Column({ nullable: true })
  first_name: string;

  @ApiProperty({
    example: "Botirov",
    description: "user surname",
  })
  @Column({ nullable: true })
  last_name: string;

  @ApiProperty({
    example: "901234567",
    description: "user mobile phone number",
  })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({
    example: "bemor@gmail.com",
    description: "user email account",
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: "bemor paroli",
    description: "user password",
  })
  @Column()
  password: string;

  @Column({ nullable: true })
  declare hashed_refresh_token?: string;

  @Column({
    type: "uuid",
    default: () => `'${uuidv4()}'`, // <-- DIQQAT: bu yerda funksiyani string sifatida SQL-ga uzatyapti
  })
  activation_link: string;

  @Column({ default: false })
  is_active: boolean;

  @OneToMany(() => UserAddress, (address) => address.user)
  @ApiProperty({
    type: () => [UserAddress],
    description: "Foydalanuvchining manzillari",
  })
  addresses: UserAddress[];

  @OneToMany(() => Cart, (cart) => cart.user)
  @ApiProperty({
    type: () => [Cart],
    description: "Foydalanuvchining savatlari",
  })
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  @ApiProperty({
    type: () => [Order],
    description: "Foydalanuvchining buyurtmalari",
  })
  orders: Order[];
}
