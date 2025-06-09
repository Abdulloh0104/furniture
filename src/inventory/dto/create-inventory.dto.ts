import { ApiProperty } from "@nestjs/swagger";
import { ProductVariant } from "../../product_variants/entities/product_variant.entity";
import { IsNumber, IsOptional } from "class-validator";

export class CreateInventoryDto {
  @IsNumber()
  @ApiProperty({ description: "Hozirgi mavjud miqdor", example: 20 })
  quantity: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: "Buyurtma qilingan ammo hali chiqarilmagan miqdor",
    example: 5,
  })
  reserved_quantity: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description:
      "Zaxira minimal darajaga tushganda qayta buyurtma berilishi kerak bo‘lgan miqdor",
    example: 10,
  })
  reorder_point: number;

  @IsOptional()
  @ApiProperty({
    description: "Oxirgi bor qachon zaxira yangilangan",
    example: "2025-05-29T12:00:00Z",
  })
  last_restocked?: Date;

  @ApiProperty({
    description: "Agar mahsulot varianti bo‘lsa, ushbu variant",
    example: "1",
  })
  product_variant?: ProductVariant;
}
