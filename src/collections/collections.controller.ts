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
import { CollectionsService } from "./collections.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";
import { Roles } from "../common/decorators/role.decorator";
import { UserGuard } from "../common/guards/user.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("collections")
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @ApiBearerAuth()
  @Roles("admin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(createCollectionDto);
  }

  @Get()
  findAll() {
    return this.collectionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.collectionsService.findOne(+id);
  }

  @ApiBearerAuth()
  @Roles("admin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCollectionDto: UpdateCollectionDto
  ) {
    return this.collectionsService.update(+id, updateCollectionDto);
  }

  @ApiBearerAuth()
  @Roles("admin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.collectionsService.remove(+id);
  }
}
