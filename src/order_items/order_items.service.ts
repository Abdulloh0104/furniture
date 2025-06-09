import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderItemDto } from "./dto/create-order_item.dto";
import { UpdateOrderItemDto } from "./dto/update-order_item.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItem } from "./entities/order_item.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderiRepo: Repository<OrderItem>
  ) {}
  create(createOrderItemDto: CreateOrderItemDto) {
    return this.orderiRepo.save(createOrderItemDto);
  }

  findAll() {
    return this.orderiRepo.find({ relations: ["order", "variant", "product"] });
  }

  findOne(id: number) {
    return this.orderiRepo.findOneBy({ id });
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    const user = await this.orderiRepo.preload({ id, ...updateOrderItemDto });
    if (!user) {
      throw new NotFoundException(`Order item with ${id} id not found`);
    }

    return this.orderiRepo.save(user);
  }

  remove(id: number) {
    return this.orderiRepo.delete({ id });
  }
}
