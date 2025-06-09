import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User } from './entities/user.entity';
import { Roles } from '../common/decorators/role.decorator';
import { RolesGuard } from '../common/guards/role.guard';
import { UserGuard } from '../common/guards/user.guard';
import { SelfGuard } from '../common/guards/jwt-self.guard';


@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBearerAuth()
  @Roles("admin")
  @UseGuards(UserGuard, RolesGuard)
  @ApiOperation({ summary: "CREATE" })
  @ApiResponse({
    status: 200,
    description: "Activation",
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @Roles("admin")
  @UseGuards(UserGuard, RolesGuard)
  @ApiOperation({ summary: "GET ALL" })
  @ApiResponse({
    status: 200,
    description: "List of Users",
    type: [User],
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @Roles("admin")
  @UseGuards(UserGuard, SelfGuard)
  @ApiOperation({ summary: "GET One By Id" })
  @ApiResponse({
    status: 200,
    description: "User",
    type: User,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiBearerAuth()
  @Roles("admin")
  @UseGuards(UserGuard, RolesGuard)
  @ApiOperation({ summary: "UPDATE" })
  @ApiResponse({
    status: 200,
    description: "Update User",
    type: User,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @Roles("admin")
  @UseGuards(UserGuard, RolesGuard)
  @ApiOperation({ summary: "DELETE" })
  @ApiResponse({
    status: 200,
    description: "Delete Patient",
    type: User,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.usersService.activateUser(link);
  }
}
