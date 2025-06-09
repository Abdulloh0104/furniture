import { ApiProperty } from "@nestjs/swagger";
import { Cart } from "../../cart/entities/cart.entity";
import { ProductVariant } from "../../product_variants/entities/product_variant.entity";

export class CreateCartItemDto {
  @ApiProperty({
    description: "miqdori",
    example: "1",
  })
  quantity: number;

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

  // @ApiProperty({
  //   description: "Product turi",
  //   example: "1",
  // })
  // variant: ProductVariant;
}
