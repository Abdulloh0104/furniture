import { Module } from '@nestjs/common';
import { UserAddressesService } from './user_addresses.service';
import { UserAddressesController } from './user_addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from './entities/user_address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress])],
  controllers: [UserAddressesController],
  providers: [UserAddressesService],
})
export class UserAddressesModule {}
