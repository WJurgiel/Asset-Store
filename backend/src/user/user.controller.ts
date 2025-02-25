import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./Dto/create-user.dto";
import { UserService } from "./user.service";
import { plainToInstance } from "class-transformer";
import { UserDto } from "./Dto/user.dto";
import { TokenGuard } from "../auth/token.guard";
import { UserID } from "../auth/user.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post("/create")
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return plainToInstance(UserDto, user);
  }
  @Get("/me")
  @UseGuards(TokenGuard)
  async me(@UserID() userId: number) {
    const user = await this.userService.findOne(userId);
    return plainToInstance(UserDto, user);
  }
}
