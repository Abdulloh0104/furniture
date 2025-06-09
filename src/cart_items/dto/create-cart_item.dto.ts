import { ApiProperty } from "@nestjs/swagger";
import { Cart } from "../../cart/entities/cart.entity";
import { ProductVariant } from "../../product_variants/entities/product_variant.entity";
import { IsNumber, IsOptional } from "class-validator";

export class CreateCartItemDto {
  @IsNumber()
  @ApiProperty({
    description: "miqdori",
    example: "1",
  })
  quantity: number;

  @IsNumber()
  @ApiProperty({
    description: "Bebel(lar)ning narxi",
    example: "25",
  })
  unit_price: number;

  @ApiProperty({
    description: "savat idsi",
    example: "1",
  })
  cart: Cart;

  @ApiProperty({
    description: "Product turi",
    example: "1",
  })
  variant: ProductVariant;
}
