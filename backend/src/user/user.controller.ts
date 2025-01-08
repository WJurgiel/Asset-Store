import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./Dto/create-user.dto";
import { UserService } from "./user.service";
import { plainToInstance } from "class-transformer";
import { UserDto } from "./Dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return plainToInstance(UserDto, user);
  }
}
