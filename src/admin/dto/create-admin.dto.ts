import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateAdminDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "Aziz",
    description: "admin name",
  })
  first_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "Botirov",
    description: "admin surname",
  })
  last_name: string;

  @IsEmail()
  @ApiProperty({
    example: "bemor@gmail.com",
    description: "admin email account",
  })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "901234567",
    description: "admin mobile phone number",
  })
  phone: string;

  @IsString({ message: "parol kiritilmadi" })
  @ApiProperty({
    example: "admin paroli",
    description: "admin password",
  })
  password: string;

  @IsString({ message: "parolga mos emas" })
  @ApiProperty({
    example: "admin paroli qaytaring",
    description: "admin password",
  })
  confirm_password: string;

  @IsString({ message: "role kiritilmadi" })
  @ApiProperty({
    example: "admin roli",
    description: "admin roli",
  })
  role: string;
}
