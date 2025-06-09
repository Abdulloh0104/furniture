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
import { Order } from "../../orders/entities/order.entity";
import { ProductVariant } from "../../product_variants/entities/product_variant.entity";

@Entity("order_items")
export class OrderItem {
  @ApiProperty({ description: "Productning noyob IDsi " })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Product nomi", example: "Oq classik devan" })
  @Column()
  product_name: string;

  @ApiProperty({ description: "sku raqami", example: "qsdcfre43434" })
  @Column()
  product_sku: string;

  @ApiProperty({
    description: "Bebelning soni",
    example: "25",
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
    description: "Bebel(lar)ning umumit narxi narxi",
    example: "25",
  })
  @Column({
    type: "decimal",
  })
  total_price: number;

  @ApiProperty({
    description: "Ma'lumot birinchi kiritilgan vaqt",
    example: "2025-05-29T10:30:00Z",
  })
  @CreateDateColumn({ type: "timestamp" })
  create_at: Date;

  @ApiProperty({
    type: () => Order,
    description: "Product zakazi",
    example: "stol",
  })
  @ManyToOne(() => Order, (order) => order.order_items)
  order: Order;

  @ApiProperty({
    type: () => ProductVariant,
    description: "Product turi",
    example: "stol",
  })
  @ManyToOne(() => ProductVariant, (variant) => variant.order_items)
  variant: ProductVariant;

  @ApiProperty({ type: () => Product,
    description: "Product turi",
    example: "stol",})
  @ManyToOne(() => Product, (product) => product.orderitems)
  product: Product;
}
