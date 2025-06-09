import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "../../products/entities/product.entity";

@Entity("collection")
export class Collection {
  @ApiProperty({ description: "Collectionning noyob IDsi " })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Collection nomi", example: "Oq classik devan" })
  @Column()
  name: string;

  @ApiProperty({ description: "tushuncha", example: "Collection haqida" })
  @Column()
  description: string;

  @ApiProperty({ description: "rasm linki", example: "mebel.gpg" })
  @Column()
  image_url: string;

  @ApiProperty({
    description: "hozir faoliyat olib bormoqdami",
    example: "true",
  })
  @Column({ default: true, })
  is_active: boolean;

  @ApiProperty({
    description: "Ma'lumot birinchi kiritilgan vaqt",
    example: "2025-05-29T10:30:00Z",
  })
  @CreateDateColumn({ type: "timestamp" })
  create_at: Date;

  @OneToMany(() => Product, (product) => product.collection)
  products: Product[];
}
