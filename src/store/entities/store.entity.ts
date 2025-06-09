import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Inventory } from "../../inventory/entities/inventory.entity";

@Entity("store")
export class Store {
  @ApiProperty({ description: "Store yozuvining noyob IDsi " })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Filial nomi", example: "Chorsu" })
  @Column()
  name: string;

  @ApiProperty({ description: "Turi", example: "Savdo" })
  @Column()
  type: string;

  @ApiProperty({ description: "address", example: "manzili" })
  @Column()
  address: string;

  @ApiProperty({ description: "city", example: "shahar nomi" })
  @Column()
  city: string;

  @ApiProperty({ description: "tel", example: "+998901234567" })
  @Column()
  phone: string;

  @ApiProperty({ description: "e-poshta manzili", example: "store@gmail.com" })
  @Column()
  email: string;

  @ApiProperty({ description: "ishvaqti boshlanishi", example: "09:00" })
  @Column()
  opening_hours: string;

  @ApiProperty({
    description: "hozir faoliyat olib botmoqdami",
    example: "true",
  })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({
    description: "Yozuv birinchi kiritilgan vaqt",
    example: "2025-05-29T10:30:00Z",
  })
  @CreateDateColumn({ type: "timestamp" })
  create_at: Date;

  @OneToMany(() => Inventory, (inventory) => inventory.store)
  @ApiProperty({
    type: () => [Inventory],
    description: "Mahsulot turlari",
  })
  inventories: Inventory[];
}
