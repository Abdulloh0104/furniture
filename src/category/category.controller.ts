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
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { RolesGuard } from "../common/guards/role.guard";
import { UserGuard } from "../common/guards/user.guard";
import { Roles } from "../common/decorators/role.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth()
  @Roles("admin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiBearerAuth()
  @Roles("admin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @ApiBearerAuth()
  @Roles("admin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoryService.remove(+id);
  }
}
