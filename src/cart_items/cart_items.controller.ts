import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../common/decorators/role.decorator';
import { UserGuard } from '../common/guards/user.guard';
import { RolesGuard } from '../common/guards/role.guard';

@ApiBearerAuth()
@Controller("cart-items")
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Roles("admin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemsService.create(createCartItemDto);
  }

  @Roles("admin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Get()
  findAll() {
    return this.cartItemsService.findAll();
  }

  @Roles("admin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cartItemsService.findOne(+id);
  }

  @Roles("admin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCartItemDto: UpdateCartItemDto
  ) {
    return this.cartItemsService.update(+id, updateCartItemDto);
  }

  @Roles("admin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cartItemsService.remove(+id);
  }
}
