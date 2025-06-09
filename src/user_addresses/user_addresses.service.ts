import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user_address.dto';
import { UpdateUserAddressDto } from './dto/update-user_address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddress } from './entities/user_address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAddressesService {
   constructor(
      @InjectRepository(UserAddress)
      private readonly uARepo: Repository<UserAddress>
    ) {}
  create(createUserAddressDto: CreateUserAddressDto) {
    return this.uARepo.save(createUserAddressDto)
  }

  findAll() {
    return this.uARepo.find({relations:["user"]})
    }

  findOne(id: number) {
    return this.uARepo.findOneBy({id})
  }

 async update(id: number, updateUserAddressDto: UpdateUserAddressDto) {
  const updated = await this.uARepo.preload({id, ...updateUserAddressDto})
  
      if (!updated) {
        throw new NotFoundException(`${id}-iddagi address yo'q`)
      }
      return this.uARepo.save(updated)
  
  }

 async remove(id: number) {
   await this.uARepo.delete(id);
   return { message: `${id}-address deleted` };
  }
}
