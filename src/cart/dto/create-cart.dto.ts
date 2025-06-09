import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities/user.entity";

export class CreateCartDto {
  user: User;
  // User id berilsa User tablega, berilmasa session_id automatik ravishda kiritib ketadi
  session_id?:string
}
