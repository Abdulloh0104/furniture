import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
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

  @Column({
    type: "enum",
    enum: ["admin", "stuff", "superadmin"],
    default: "stuff",
  })
  role: string;

  @Column({ default: true })
  is_active: boolean;
}
