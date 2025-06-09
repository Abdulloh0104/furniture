import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../../products/entities/product.entity";

export class CreateProductVariantDto {
  @ApiProperty({ description: "Product nomi", example: "Oq classik devan" })
  name: string;

  @ApiProperty({ description: "sku raqami", example: "qerfe9924t" })
  sku: string;

  @ApiProperty({ description: "rangi", example: "black" })
  color: string;

  @ApiProperty({ description: "razmeri", example: "100X80" })
  size: string;

  @ApiProperty({ description: "usti", example: "Laklangan" })
  finish: string;

  @ApiProperty({
    description: "Bebelning narxi",
    example: "30",
  })
  price_adjustment: number;

  product: Product;
}
