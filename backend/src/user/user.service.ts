import { ConflictException, Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { CreateUserDto } from "./Dto/create-user.dto";
import * as argon2 from "argon2";
@Injectable()
export class UserService {
  constructor(private readonly database: DatabaseService) {}
  async create(createUserDto: CreateUserDto) {
    const passHash = await argon2.hash(createUserDto.password);
    try {
      return await this.database.users.create({
        data: {
          nickname: createUserDto.nickname,
          email: createUserDto.email,
          password: passHash,
        },
      });
    } catch (e) {
      if (e.code == "P2002") throw new ConflictException("User already exists");
    }
  }
}
