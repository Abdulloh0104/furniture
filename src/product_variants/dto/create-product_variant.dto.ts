import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../../products/entities/product.entity";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductVariantDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: "Product nomi", example: "Oq classik devan" })
  name: string;

  @IsString()
  @ApiProperty({ description: "sku raqami", example: "qerfe9924t" })
  sku: string;

  @IsString()
  @ApiProperty({ description: "rangi", example: "black" })
  color: string;

  @IsString()
  @ApiProperty({ description: "razmeri", example: "100X80" })
  size: string;

  @IsString()
  @ApiProperty({ description: "usti", example: "Laklangan" })
  finish: string;

  @IsNumber()
  @ApiProperty({
    description: "Bebelning narxi",
    example: "30",
  })
  price_adjustment: number;

  product: Product;
}
