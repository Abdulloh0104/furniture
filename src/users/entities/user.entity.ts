import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  declare hashed_refresh_token?: string;

  @Column({ nullable: true })
  address: string;

  @Column({
    type: "uuid",
    default: () => `'${uuidv4()}'`, // <-- DIQQAT: bu yerda funksiyani string sifatida SQL-ga uzatyapti
  })
  activation_link: string

  @Column({ default: false })
  is_active: boolean;
}
