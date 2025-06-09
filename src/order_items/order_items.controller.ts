import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../common/decorators/role.decorator';
import { UserGuard } from '../common/guards/user.guard';
import { RolesGuard } from '../common/guards/role.guard';

@ApiBearerAuth()
@Controller("order-items")
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Roles("user")
  @UseGuards(UserGuard, RolesGuard)
  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Roles("admin", "superadmin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Get()
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Roles("admin", "superadmin", "user", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.orderItemsService.findOne(+id);
  }

  @Roles("admin", "superadmin", "user", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto
  ) {
    return this.orderItemsService.update(+id, updateOrderItemDto);
  }

  @Roles("admin", "superadmin", "user", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.orderItemsService.remove(+id);
  }
}
