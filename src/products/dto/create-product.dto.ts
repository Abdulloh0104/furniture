import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDecimal, IsInt, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  @ApiProperty({ description: "Product nomi", example: "Oq classik devan" })
  name: string;

  @IsString()
  @ApiProperty({ description: "tushuncha", example: "qulay mahsulot" })
  description?: string;

  @IsNumber()
  @ApiProperty({
    description: "Bebelning eng boshlang'ish narxi",
    example: "25",
  })
  base_price?: number;

  @IsString()
  @ApiProperty({ description: "materioal turi", example: "Charm" })
  material?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: "hozir faoliyat olib bormoqdami",
    example: "true",
  })
  is_active?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: "tanlanganmi",
    example: "true",
  })
  is_featured?: boolean;
}
