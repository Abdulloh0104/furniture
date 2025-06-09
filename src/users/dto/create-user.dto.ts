import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: "Aziz",
    description: "user name",
  })
  first_name: string;

  @ApiProperty({
    example: "Botirov",
    description: "user surname",
  })
  last_name: string;

  @ApiProperty({
    example: "901234567",
    description: "user mobile phone number",
  })
  phone: string;

  @ApiProperty({
    example: "userr@gmail.com",
    description: "user email account",
  })
  email: string;

  @ApiProperty({
    example: "user paroli",
    description: "user password",
  })
  password: string;

  @ApiProperty({
    example: "user paroli",
    description: "user passwordni tasdiqlang ",
  })
  confirm_password: string;
}
