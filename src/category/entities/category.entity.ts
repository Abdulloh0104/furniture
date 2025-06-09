import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { Product } from "../../products/entities/product.entity";

@Entity("category")
export class Category {
  @ApiProperty({ description: "Store yozuvining noyob IDsi " })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Kategoriya nomi", example: "Oq classik devan" })
  @Column()
  name: string;

  @ApiProperty({
    description: "Qisqacha mebel turi haqida ma'lumot beruvchi bo'lim nomis",
    example: "Cosmo",
  })
  @Column({ default: "slug", nullable: false })
  slug: string;

  @ApiProperty({ description: "tushuncha", example: "qulay mahsulot" })
  @Column({ nullable: false })
  description: string;

  @ApiProperty({ description: "rasm linki", example: "mebel.gpg" })
  @Column({ nullable: false })
  image_url: string;

  @ApiProperty({
    description: "hozir faoliyat olib bormoqdami",
    example: "true",
  })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({
    description: "Ma'lumot birinchi kiritilgan vaqt",
    example: "2025-05-29T10:30:00Z",
  })
  @CreateDateColumn({ type: "timestamp" })
  create_at: Date;

  @ApiProperty({
    type: () => Category,
    description: "Asosoy categoriya",
    example: "divan, stol,stul",
  })
  @ManyToOne(() => Category, (category) => category.children, {
    nullable: true,
  })
  parent: Category;

  @ApiProperty({ type: () => [Category] })
  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @ApiProperty({ type: () => [Product] })
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
