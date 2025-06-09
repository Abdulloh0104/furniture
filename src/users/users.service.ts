import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly mailService: MailService
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.userRepo.save({
      ...createUserDto,
      password: hashed_password,
    });

    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }

    return newUser;
  }

  findAll() {
    return this.userRepo.find({ relations: ["addresses","orders"] });
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  findUserByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.preload({ id, ...updateUserDto });
    if (!user) {
      throw new NotFoundException(`Admin with ${id} id not found`);
    }

    return this.userRepo.save(user);
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updatedUser = await this.userRepo.update(
      { id },
      { hashed_refresh_token }
    );
    return updatedUser;
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }

    const user = await this.userRepo.findOneBy({
      activation_link: link,
    });

    if (!user) {
      throw new NotFoundException("User not found or invalid link");
    }

    if (user.is_active) {
      throw new BadRequestException("User already activated");
    }

    user.is_active = true;
    await this.userRepo.save(user);

    return {
      message: "User activated successfully",
      is_active: user.is_active,
    };
  }
}
