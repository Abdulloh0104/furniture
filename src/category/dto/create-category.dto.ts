import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { Category } from "../entities/category.entity";

export class CreateCategoryDto {

  @IsString()
  @ApiProperty({ description: "Kategoriya nomi", example: "Oq classik devan" })
  name?: string;

  @IsString()
  @ApiProperty({
    description: "Qisqacha mebel turi haqida ma'lumot beruvchi bo'lim nomis",
    example: "Cosmo",
  })
  slug?: string;

  @IsString()
  @ApiProperty({ description: "tushuncha", example: "qulay mahsulot" })
  description?: string;

  @IsString()
  @ApiProperty({ description: "rasm linki", example: "mebel.gpg" })
  image_url?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: "hozir faoliyat olib botmoqdami",
    example: "true",
  })
  is_active?: boolean;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: "Asosoy categoriya",
    example: "4",
  })
  parent?: Category
}
