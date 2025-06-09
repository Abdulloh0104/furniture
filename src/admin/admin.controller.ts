import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Admin } from './entities/admin.entity';
import { Roles } from '../common/decorators/role.decorator';
import { UserGuard } from '../common/guards/user.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { SelfGuard } from '../common/guards/jwt-self.guard';

@ApiBearerAuth()
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles("superadmin")
  @UseGuards(UserGuard, RolesGuard)
  @ApiOperation({ summary: "CREATE" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: Admin,
  })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Roles("admin", "superadmin")
  @UseGuards(UserGuard, RolesGuard)
  @ApiOperation({ summary: "GET ALL" })
  @ApiResponse({
    status: 200,
    description: "List of Admins",
    type: [Admin],
  })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Roles("admin")
  @UseGuards(UserGuard, SelfGuard)
  @ApiOperation({ summary: "GET One By Id" })
  @ApiResponse({
    status: 200,
    description: "Admin",
    type: Admin,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @Roles("admin")
  @UseGuards(UserGuard, SelfGuard)
  @ApiOperation({ summary: "UPDATE" })
  @ApiResponse({
    status: 200,
    description: "Update Admin",
    type: Admin,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Roles("admin")
  @UseGuards(UserGuard, SelfGuard)
  @Post("password/:id")
  updatePassord(
    @Param("id") id: string,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    return this.adminService.updatePassword(+id, updatePasswordDto);
  }

  @Roles("superadmin")
  @UseGuards(UserGuard, RolesGuard)
  @ApiOperation({ summary: "DELETE" })
  @ApiResponse({
    status: 200,
    description: "Delete Patient",
    type: Admin,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
