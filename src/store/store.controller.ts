import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Store } from './entities/store.entity';
import { Roles } from '../common/decorators/role.decorator';
import { UserGuard } from '../common/guards/user.guard';
import { RolesGuard } from '../common/guards/role.guard';

@Controller("store")
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @ApiBearerAuth()
  @Roles("admin")
  @UseGuards(UserGuard, RolesGuard)
  @ApiOperation({ summary: "CREATE" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Store,
  })
  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @ApiOperation({ summary: "GET ALL" })
  @ApiResponse({
    status: 200,
    description: "List of Stores",
    type: [Store],
  })
  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @ApiOperation({ summary: "GET One By Id" })
  @ApiResponse({
    status: 200,
    description: "Store",
    type: Store,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.storeService.findOne(+id);
  }

  @ApiBearerAuth()
  @Roles("admin", "superadmin")
  @UseGuards(UserGuard, RolesGuard)
  @ApiOperation({ summary: "UPDATE" })
  @ApiResponse({
    status: 200,
    description: "Update Store",
    type: Store,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @ApiBearerAuth()
  @Roles("superadmin")
  @UseGuards(UserGuard, RolesGuard)
  @ApiOperation({ summary: "DELETE" })
  @ApiResponse({
    status: 200,
    description: "Delete Patient",
    type: Store,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.storeService.remove(+id);
  }
}
