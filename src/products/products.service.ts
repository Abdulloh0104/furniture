import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { Category } from "../category/entities/category.entity";
import { Collection } from "../collections/entities/collection.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {}
  async create(createProductDto: CreateProductDto) {
    const newp = this.productRepo.create(createProductDto);

    return this.productRepo.save(newp);
  }
 
  findAll() {
    return this.productRepo.find({
      relations: ["collection", "category","variants"],
    });
  }
  
  findOne(id: number) {
    return this.productRepo.findOneBy({ id });
  }
 
  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateProduct = await this.productRepo.preload({id, ...updateProductDto})

    if (!updateProduct) {
      throw new NotFoundException(`${id}-iddagi product yo'q`)
    }
    return this.productRepo.save(updateProduct)
  }

  async remove(id: number) {
    await this.productRepo.delete(id);
    return { message: `${id}-product deleted` };
  }
}
