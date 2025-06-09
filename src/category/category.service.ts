import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) {}

  create(createCategoryDto: CreateCategoryDto){
    return this.categoryRepo.save(createCategoryDto)
  }

  findAll() {
    return this.categoryRepo.find({
      relations: ["parent", "children", "products"],
    });
  }

  findOne(id: number) {
    return this.categoryRepo.findOneBy({
      id,
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const user = await this.categoryRepo.preload({ id, ...updateCategoryDto });
    if (!user) {
      throw new NotFoundException(`Category with ${id} id not found`);
    }

    return this.categoryRepo.save(user);
  }

  async remove(id: number) {
    await this.categoryRepo.delete(id);
    return id;
  }
}
