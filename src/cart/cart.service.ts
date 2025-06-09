import { Injectable } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "./entities/cart.entity";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>
  ) {}
  async create(createCartDto: CreateCartDto) {
    const session_id = uuidv4();
    
    const newCart = this.cartRepo.create(createCartDto);
    if (createCartDto.user === undefined) {
      return this.cartRepo.save({ ...newCart, session_id });
    }
    return this.cartRepo.save(createCartDto);
  }

  findAll() {
    return this.cartRepo.find({ relations: ["user"] });
  }

  findOne(id: number) {
    return this.cartRepo.findOneBy({ id });
  }

 async update(id: number, updateCartDto: UpdateCartDto) {
    const updated = await this.cartRepo.preload({
      id,
      ...updateCartDto,
    });
    if (updated?.user !== undefined &&typeof updated.session_id===typeof uuidv4()) {
      return this.cartRepo.save(
        { ...updated, session_id: "" }
      );
    }
    return this.cartRepo.save(updated!);
  }

  remove(id: number) {
    return this.cartRepo.delete({ id });
  }
}
