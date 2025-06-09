import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { User } from "../../users/entities/user.entity";

export class CreateUserAddressDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: "Product nomi", example: "Oq classik devan" })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "country", example: "Uzbekiston" })
  country: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "shahar", example: "Tashkent" })
  city: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "yashash joyi, kvartira",
    example: "dom",
  })
  apartment: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "Ko'cha nomi", example: "Bog'ston" })
  street: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "manzil pochta raqami",
    example: "100092 for Chilonzor tumani",
  })
  postal_code: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: "Default qo'yilganmi",
    example: "true",
  })
  is_default: boolean;

  @ApiProperty({
    description: "Manzil egalari (foydalanuvchi)",
  })
  user: User;
}
