import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return this.orderRepo.save(createOrderDto);
  }

  findAll() {
    return this.orderRepo.find({ relations: ["user", "payments"] });
  }

  findOne(id: number) {
    return this.orderRepo.findOneBy({ id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const user = await this.orderRepo.preload({ id, ...updateOrderDto });
    if (!user) {
      throw new NotFoundException(`Order with ${id} id not found`);
    }

    return this.orderRepo.save(user);
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }
}
