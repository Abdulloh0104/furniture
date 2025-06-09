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
import { Category } from "../../category/entities/category.entity";
import { Collection } from "../../collections/entities/collection.entity";
import { ProductVariant } from "../../product_variants/entities/product_variant.entity";

@Entity("product")
export class Product {
  @ApiProperty({ description: "Productning noyob IDsi " })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Product nomi", example: "Oq classik devan" })
  @Column()
  name: string;

  @ApiProperty({ description: "tushuncha", example: "qulay mahsulot" })
  @Column()
  description: string;

  @ApiProperty({
    description: "Bebelning eng boshlang'ish narxi",
    example: "25",
  })
  @Column({
    type: "decimal",
  })
  base_price: number;

  @ApiProperty({ description: "materioal turi", example: "Charm" })
  @Column()
  material: string;

  @ApiProperty({
    description: "hozir faoliyat olib bormoqdami",
    example: "true",
  })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({
    description: "tanlanganmi",
    example: "true",
  })
  @Column({ default: false })
  is_featured: boolean;

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
    description: "Product categoriyasi",
    example: "stol",
    type: () => Category,
  })
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ApiProperty({
    description: "Product koleksiyasi",
    example: "oq mebel",
    type: () => Collection,
    nullable: true,
  })
  @ManyToOne(() => Collection, (collection) => collection.products)
  collection: Collection;

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  @ApiProperty({
    type: () => [ProductVariant],
    description: "Mahsulot turlari",
  })
  variants: ProductVariant[];
}
