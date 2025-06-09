import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: "Aziz",
    description: "user name",
  })
  first_name: string;

  @IsString()
  @ApiProperty({
    example: "Botirov",
    description: "user surname",
  })
  last_name: string;

  @IsPhoneNumber()
  @ApiProperty({
    example: "901234567",
    description: "user mobile phone number",
  })
  phone: string;

  @IsString()
  @ApiProperty({
    example: "userr@gmail.com",
    description: "user email account",
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: "user paroli",
    description: "user password",
  })
  password: string;

  @IsString({ message: "parol mos emas" })
  @ApiProperty({
    example: "user paroli",
    description: "user passwordni tasdiqlang ",
  })
  confirm_password: string;
}
