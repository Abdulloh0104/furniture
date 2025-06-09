import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ProductVariantsService } from "./product_variants.service";
import { CreateProductVariantDto } from "./dto/create-product_variant.dto";
import { UpdateProductVariantDto } from "./dto/update-product_variant.dto";
import { Roles } from "../common/decorators/role.decorator";
import { UserGuard } from "../common/guards/user.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("product-variants")
export class ProductVariantsController {
  constructor(
    private readonly productVariantsService: ProductVariantsService
  ) {}
  @ApiBearerAuth()
  @Roles("admin", "superadmin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Post()
  create(@Body() createProductVariantDto: CreateProductVariantDto) {
    return this.productVariantsService.create(createProductVariantDto);
  }

  @Get()
  findAll() {
    return this.productVariantsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productVariantsService.findOne(+id);
  }

  @ApiBearerAuth()
  @Roles("admin", "superadmin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProductVariantDto: UpdateProductVariantDto
  ) {
    return this.productVariantsService.update(+id, updateProductVariantDto);
  }

  @ApiBearerAuth()
  @Roles("admin", "superadmin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productVariantsService.remove(+id);
  }
}
