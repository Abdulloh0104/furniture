import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateStoreDto {
  @IsString()
  @ApiProperty({ description: "Filial nomi", example: "Chorsu" })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "Turi", example: "Savdo" })
  type: string;

  @IsString()
  @ApiProperty({ description: "address", example: "manzili" })
  address: string;

  @IsString()
  @ApiProperty({ description: "city", example: "shahar nomi" })
  city: string;

  @IsString()
  @ApiProperty({ description: "tel", example: "+998901234567" })
  phone: string;

  @IsString()
  @ApiProperty({ description: "e-poshta manzili", example: "store@gmail.com" })
  email: string;

  @IsString()
  @ApiProperty({ description: "ishvaqti boshlanishi", example: "09:00" })
  opening_hours: string;

  @IsBoolean()
  @ApiProperty({
    description: "hozir faoliyat olib botmoqdami",
    example: "true",
  })
  is_active: boolean;
}
