import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { UserGuard } from '../common/guards/user.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/role.decorator';

@ApiBearerAuth()
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Roles("admin", "superadmin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Roles("admin", "superadmin", "stuff")
  @UseGuards(UserGuard, RolesGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Roles("admin", "superadmin")
  @UseGuards(UserGuard, RolesGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Roles("admin", "superadmin")
  @UseGuards(UserGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }
}
