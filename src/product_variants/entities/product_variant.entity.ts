import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "../../products/entities/product.entity";
import { CartItem } from "../../cart_items/entities/cart_item.entity";
import { Cart } from "../../cart/entities/cart.entity";
import { OrderItem } from "../../order_items/entities/order_item.entity";
import { Inventory } from "../../inventory/entities/inventory.entity";

@Entity("product_variant")
export class ProductVariant {
  @ApiProperty({ description: "Productning noyob IDsi " })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Product nomi", example: "Oq classik devan" })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ description: "sku raqami", example: "qerfe9924t" })
  @Column({ nullable: true })
  sku: string;

  @ApiProperty({ description: "rangi", example: "black" })
  @Column({ nullable: true })
  color: string;

  @ApiProperty({ description: "razmeri", example: "100X80" })
  @Column({ nullable: true })
  size: string;

  @ApiProperty({ description: "usti", example: "Laklangan" })
  @Column({ nullable: true })
  finish: string;

  @ApiProperty({
    description: "Bebelning narxi",
    example: "30",
  })
  @Column({
    type: "decimal",
  })
  price_adjustment: number;

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

  @ApiProperty({
    type: () => Product,
    description: "Product turi",
    example: "1",
  })
  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;

  @OneToMany(() => CartItem, (product) => product.variant)
  @ApiProperty({
    type: () => [CartItem],
    description: "Savat mahsulotlari",
  })
  cart_items: CartItem[];

  @OneToMany(() => OrderItem, (i) => i.variant)
  @ApiProperty({
    type: () => [OrderItem],
    description: "Buyurtma mahsulotlari",
  })
  order_items: OrderItem[];

  @OneToMany(() => Inventory, (i) => i.product_variant)
  @ApiProperty({
    type: () => [Inventory],
    description: "Omborlar",
  })
  inventories: Inventory[];
}
