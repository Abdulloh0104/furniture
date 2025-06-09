import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateCollectionDto {

  @IsString()
  @ApiProperty({ description: "Collection nomi", example: "Oq classik devan" })
  name?: string;

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
}
