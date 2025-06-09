import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCartItemDto } from "./dto/create-cart_item.dto";
import { UpdateCartItemDto } from "./dto/update-cart_item.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItem } from "./entities/cart_item.entity";
import { Repository } from "typeorm";

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private readonly ciRepo: Repository<CartItem>
  ) {}

  create(createCartItemDto: CreateCartItemDto) {
    return this.ciRepo.save(createCartItemDto);
  }

  findAll() {
    return this.ciRepo.find({
      relations: ["variant", "cart"],
    });
  }

  findOne(id: number) {
    return this.ciRepo.findOneBy({ id });
  }

  async update(id: number, updateCartItemDto: UpdateCartItemDto) {
    const user = await this.ciRepo.preload({ id, ...updateCartItemDto });
    if (!user) {
      throw new NotFoundException(`Cart Item with ${id} id not found`);
    }

    return this.ciRepo.save(user);
  }

  remove(id: number) {
    return this.ciRepo.delete(id)
  }
}
