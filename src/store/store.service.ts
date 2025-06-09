import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Store } from "./entities/store.entity";
import { Repository } from "typeorm";

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>
  ) {}
  async create(createStoreDto: CreateStoreDto) {
    const inventory = this.storeRepository.create(createStoreDto);
    return await this.storeRepository.save(inventory);
  }

  async findAll() {
    return await this.storeRepository.find();
  }

  async findOne(id: number) {
    const inventory = await this.storeRepository.findOneBy({ id });

    if (!inventory) {
      throw new NotFoundException(`Inventory ${id} topilmadi`);
    }

    return inventory;
  }

 async update(id: number, updateStoreDto: UpdateStoreDto) {
   const inventory = await this.findOne(id);
   Object.assign(inventory, updateStoreDto);
   return await this.storeRepository.save(inventory);

  }

 async remove(id: number) {
   const result = await this.storeRepository.delete(id);
   if (result.affected === 0) {
     throw new NotFoundException(`Inventory ${id} topilmadi`);
   }}
}
