import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Collection } from "./entities/collection.entity";

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>
  ) {}
  create(createCollectionDto: CreateCollectionDto) {
    return this.collectionRepo.save(createCollectionDto);
  }

  findAll() {
    return this.collectionRepo.find({ relations: ["products"] });
  }

  findOne(id: number) {
    return this.collectionRepo.findOneBy({ id });
  }

  async update(id: number, updateCollectionDto: UpdateCollectionDto) {
    const user = await this.collectionRepo.preload({
      id,
      ...updateCollectionDto,
    });
    if (!user) {
      throw new NotFoundException(`Category with ${id} id not found`);
    }

    return this.collectionRepo.save(user);
  }

  async remove(id: number) {
    await this.collectionRepo.delete(id);
    return id;
  }
}
