import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Inventory } from './entities/inventory.entity';
import { Roles } from '../common/decorators/role.decorator';
import { UserGuard } from '../common/guards/user.guard';
import { RolesGuard } from '../common/guards/role.guard';

@Controller("inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiBearerAuth()
  @Roles("admin", "superadmin")
  @UseGuards(UserGuard, RolesGuard)
  @ApiOperation({ summary: "CREATE" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Inventory,
  })
  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @ApiOperation({ summary: "GET ALL" })
  @ApiResponse({
    status: 200,
    description: "List of Inventorys",
    type: [Inventory],
  })
  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @ApiOperation({ summary: "GET One By Id" })
  @ApiResponse({
    status: 200,
    description: "Inventory",
    type: Inventory,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.inventoryService.findOne(+id);
  }

  @ApiBearerAuth()
  @Roles("admin", "superadmin")
  @UseGuards(UserGuard, RolesGuard)
  @ApiOperation({ summary: "UPDATE" })
  @ApiResponse({
    status: 200,
    description: "Update Inventory",
    type: Inventory,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateInventoryDto: UpdateInventoryDto
  ) {
    return this.inventoryService.update(+id, updateInventoryDto);
  }

  @ApiBearerAuth()
  @Roles("superadmin")
  @UseGuards(UserGuard, RolesGuard)
  @ApiOperation({ summary: "DELETE" })
  @ApiResponse({
    status: 200,
    description: "Delete Patient",
    type: Inventory,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.inventoryService.remove(+id);
  }
}
