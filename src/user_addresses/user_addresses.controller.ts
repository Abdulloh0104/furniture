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
import { UserAddressesService } from "./user_addresses.service";
import { CreateUserAddressDto } from "./dto/create-user_address.dto";
import { UpdateUserAddressDto } from "./dto/update-user_address.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "../common/decorators/role.decorator";
import { UserGuard } from "../common/guards/user.guard";
import { RolesGuard } from "../common/guards/role.guard";

@ApiBearerAuth()
@Controller("user-addresses")
export class UserAddressesController {
  constructor(private readonly userAddressesService: UserAddressesService) {}

  @Roles("admin", "superadmin", "stuff", "user")
  @UseGuards(UserGuard, RolesGuard)
  @Post()
  create(@Body() createUserAddressDto: CreateUserAddressDto) {
    return this.userAddressesService.create(createUserAddressDto);
  }

  @Roles("admin", "superadmin", "stuff", "user")
  @UseGuards(UserGuard, RolesGuard)
  @Get()
  findAll() {
    return this.userAddressesService.findAll();
  }

  @Roles("admin", "superadmin", "stuff", "user")
  @UseGuards(UserGuard, RolesGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userAddressesService.findOne(+id);
  }

  @Roles("admin", "superadmin", "stuff", "user")
  @UseGuards(UserGuard, RolesGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserAddressDto: UpdateUserAddressDto
  ) {
    return this.userAddressesService.update(+id, updateUserAddressDto);
  }

  @Roles("admin", "superadmin", "stuff", "user")
  @UseGuards(UserGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userAddressesService.remove(+id);
  }
}
