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
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "../common/decorators/role.decorator";
import { RolesGuard } from "../common/guards/role.guard";
import { UserGuard } from "../common/guards/user.guard";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @Roles("admin", "superadmin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(+id);
  }

  @ApiBearerAuth()
  @Roles("admin", "superadmin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @ApiBearerAuth()
  @Roles("admin", "superadmin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }
}
