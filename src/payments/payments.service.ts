import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { Repository } from "typeorm";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>
  ) {}
  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentRepo.save(createPaymentDto);
  }

  findAll() {
    return this.paymentRepo.find({ relations: ["order"] });
  }

  findOne(id: number) {
    return this.paymentRepo.findOneBy({ id });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const user = await this.paymentRepo.preload({ id, ...updatePaymentDto });
    if (!user) {
      throw new NotFoundException(`Payment with ${id} id not found`);
    }

    return this.paymentRepo.save(user);
  }

  remove(id: number) {
    return this.paymentRepo.delete({id})
  }
}
