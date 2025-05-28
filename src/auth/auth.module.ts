import { Module } from "@nestjs/common";
// import { AuthPatientService } from "./patient/auth.service";
// import { AuthPatientController } from "./patient/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AuthAdminController } from "./admin/auth.controller";
import { AuthAdminService } from "./admin/auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "../admin/entities/admin.entity";
import { AdminModule } from "../admin/admin.module";
import { UsersModule } from "../users/users.module";
import { AuthUserController } from "./user/auth.controller";
import { AuthUserService } from "./user/auth.service";

@Module({
  imports: [JwtModule.register({ global: true }), AdminModule, UsersModule],
  controllers: [AuthAdminController,AuthUserController],
  providers: [AuthAdminService,AuthUserService],
})
export class AuthModule {}
