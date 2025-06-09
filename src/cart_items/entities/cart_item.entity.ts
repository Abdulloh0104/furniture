import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductVariant } from "../../product_variants/entities/product_variant.entity";
import { Cart } from "../../cart/entities/cart.entity";

@Entity("cart_items")
export class CartItem {
  @ApiProperty({ description: "Productning noyob IDsi " })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "miqdori",
    example: "1",
  })
  @Column()
  quantity: number;

  @ApiProperty({
    description: "Bebel(lar)ning narxi",
    example: "25",
  })
  @Column({
    type: "decimal",
  })
  unit_price: number;

  @ApiProperty({
    description: "Ma'lumot birinchi kiritilgan vaqt",
    example: "2025-05-29T10:30:00Z",
  })
  @CreateDateColumn({ type: "timestamp" })
  added_at: Date;

  @ApiProperty({
    type: () => Cart,
    description: "Ushbu mahsulot qaysi savatga tegishli",
  })
  @ManyToOne(() => Cart, (cart) => cart.cart_items)
  cart: Cart;

  @ApiProperty({
    type: () => ProductVariant,
    description: "Product turi",
    example: "1",
  })
  @ManyToOne(() => ProductVariant, (pv) => pv.cart_items)
  variant: ProductVariant;
}
