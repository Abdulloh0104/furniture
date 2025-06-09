import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../common/decorators/role.decorator';
import { RolesGuard } from '../common/guards/role.guard';
import { UserGuard } from '../common/guards/user.guard';
import { SelfGuard } from '../common/guards/jwt-self.guard';

@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @ApiBearerAuth()
  @Roles("admin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cartService.remove(+id);
  }
}
