import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
// import { Product } from "./product.entity";
// import { ProductVariant } from "./product-variant.entity";
// import { Store } from "./store.entity";
import { ApiProperty } from "@nestjs/swagger";
import { ProductVariant } from "../../product_variants/entities/product_variant.entity";
import { Product } from "../../products/entities/product.entity";
import { Store } from "../../store/entities/store.entity";

@Entity("inventory")
export class Inventory {
  @ApiProperty({ description: "Inventory yozuvining noyob IDsi " })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Hozirgi mavjud miqdor", example: 20 })
  @Column({ type: "int" })
  quantity: number;

  @ApiProperty({
    description: "Buyurtma qilingan ammo hali chiqarilmagan miqdor",
    example: 5,
  })
  @Column({ type: "int", default: 0 })
  reserved_quantity: number;

  @ApiProperty({
    description:
      "Zaxira minimal darajaga tushganda qayta buyurtma berilishi kerak bo‘lgan miqdor",
    example: 10,
  })
  @Column({ type: "int", default: 0 })
  reorder_point: number;

  @ApiProperty({
    description: "Oxirgi bor qachon zaxira yangilangan",
    example: "2025-05-29T12:00:00Z",
  })
  @Column({ type: "timestamp", nullable: true })
  last_restocked?: Date;

  @ApiProperty({
    description: "Yozuv yaratilgan vaqt",
    example: "2025-05-29T09:00:00Z",
  })
  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @ApiProperty({
    description: "Yozuv oxirgi yangilangan vaqt",
    example: "2025-05-29T10:30:00Z",
  })
  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @ApiProperty({
    description: "Ushbu zaxira yozuvi tegishli bo‘lgan mahsulot",
    type: () => Product,
    example: "1",
  })
  @ManyToOne(() => Product, (product) => product.inventories)
  product: Product;

  @ApiProperty({
    description: "Agar mahsulot varianti bo‘lsa, ushbu variant",
    type: () => ProductVariant,
    required: false,
    example: "1",
  })
  @ManyToOne(() => ProductVariant, (product) => product.inventories)
  product_variant?: ProductVariant;

  @ApiProperty({
    description: "Ushbu mahsulot saqlanayotgan do‘kon",
    type: () => Store,
    example: "1",
  })
  @ManyToOne(() => Store, (product) => product.inventories)
  store: Store;
}
