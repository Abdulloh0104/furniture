import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductVariantDto } from "./dto/create-product_variant.dto";
import { UpdateProductVariantDto } from "./dto/update-product_variant.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductVariant } from "./entities/product_variant.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariant)
    private readonly pvRepo: Repository<ProductVariant>
  ) {}
  create(createProductVariantDto: CreateProductVariantDto) {
    return this.pvRepo.save(createProductVariantDto);
  }

  findAll() {
    return this.pvRepo.find({
      relations: ["product", "cart_items", "order_items", "inventories"],
    });
  }

  findOne(id: number) {
    return this.pvRepo.findOneBy({ id });
  }

  async update(id: number, updateProductVariantDto: UpdateProductVariantDto) {
    const user = await this.pvRepo.preload({ id, ...updateProductVariantDto });
    if (!user) {
      throw new NotFoundException(`product variant with ${id} id not found`);
    }

    return this.pvRepo.save(user);
  }

  remove(id: number) {
    return this.pvRepo.delete({id})
  }
}
