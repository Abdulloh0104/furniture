import { ApiProperty } from "@nestjs/swagger";
import { Order } from "../../orders/entities/order.entity";
import { Product } from "../../products/entities/product.entity";
import { ProductVariant } from "../../product_variants/entities/product_variant.entity";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrderItemDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: "Product nomi", example: "Oq classik devan" })
  product_name: string;

  @IsString()
  @ApiProperty({ description: "sku raqami", example: "qsdcfre43434" })
  product_sku: string;

  @IsNumber()
  @ApiProperty({
    description: "Bebelning soni",
    example: "25",
  })
  quantity: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: "Bebel(lar)ning narxi",
    example: "25",
  })
  unit_price: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: "Bebel(lar)ning umumit narxi narxi",
    example: "25",
  })
  total_price: number;

  @ApiProperty({
    description: "buyurtma",
    example: "1",
  })
  order: Order;

  @ApiProperty({
    description: "Product turi",
    example: "1",
  })
  product: Product;

  @ApiProperty({
    description: "Product turi",
    example: "stol",
  })
  variant: ProductVariant;
}
