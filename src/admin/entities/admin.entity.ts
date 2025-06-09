import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
  
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Aziz",
    description: "admin name",
  })
  @Column({ nullable: true })
  first_name: string;

  @ApiProperty({
    example: "Botirov",
    description: "admin surname",
  })
  @Column({ nullable: true })
  last_name: string;

  @ApiProperty({
    example: "901234567",
    description: "admin mobile phone number",
  })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({
    example: "bemor@gmail.com",
    description: "admin email account",
  })
  @Column({ unique: true })
  email: string;
  
  @ApiProperty({
    example: "admin paroli",
    description: "admin password",
  })
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
