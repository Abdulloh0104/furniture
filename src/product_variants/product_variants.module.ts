import { Module } from "@nestjs/common";
import { ProductVariantsService } from "./product_variants.service";
import { ProductVariantsController } from "./product_variants.controller";
import { ProductVariant } from "./entities/product_variant.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariant])],
  controllers: [ProductVariantsController],
  providers: [ProductVariantsService],
})
export class ProductVariantsModule {}
