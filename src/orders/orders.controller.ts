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
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { RolesGuard } from "../common/guards/role.guard";
import { UserGuard } from "../common/guards/user.guard";
import { Roles } from "../common/decorators/role.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Roles("admin", "superadmin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Roles("admin", "superadmin", "user", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ordersService.findOne(+id);
  }

  @Roles("admin", "superadmin", "user", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Roles("admin", "superadmin", "user", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.ordersService.remove(+id);
  }
}
