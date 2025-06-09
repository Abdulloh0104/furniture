import { ApiProperty } from "@nestjs/swagger";

export class CreateStoreDto {
  @ApiProperty({ description: "Filial nomi", example: "Chorsu" })
  name: string;

  @ApiProperty({ description: "Turi", example: "Savdo" })
  type: string;
  @ApiProperty({ description: "address", example: "manzili" })
  address: string;
  @ApiProperty({ description: "city", example: "shahar nomi" })
  city: string;

  @ApiProperty({ description: "tel", example: "+998901234567" })
  phone: string;

  @ApiProperty({ description: "e-poshta manzili", example: "store@gmail.com" })
  email: string;

  @ApiProperty({ description: "ishvaqti boshlanishi", example: "09:00" })
  opening_hours: string;

  @ApiProperty({
    description: "hozir faoliyat olib botmoqdami",
    example: "true"
  })
  is_active: boolean;
}
