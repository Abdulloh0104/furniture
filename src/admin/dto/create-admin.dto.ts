import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
  @ApiProperty({
    example: "Aziz",
    description: "admin name",
  })
  first_name: string;

  @ApiProperty({
    example: "Botirov",
    description: "admin surname",
  })
  last_name: string;

  @ApiProperty({
    example: "bemor@gmail.com",
    description: "admin email account",
  })
  email: string;

  @ApiProperty({
    example: "901234567",
    description: "admin mobile phone number",
  })
  phone: string;

  @ApiProperty({
    example: "admin paroli",
    description: "admin password",
  })
  password: string;

  @ApiProperty({
    example: "admin paroli qaytaring",
    description: "admin password",
  })
  confirm_password: string;

  @ApiProperty({
    example: "admin roli",
    description: "admin roli",
  })
  role: string;
}
