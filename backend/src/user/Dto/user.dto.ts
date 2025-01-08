import { users } from "@prisma/client";
import { Exclude } from "class-transformer";
export class UserDto implements users {
  ID: number;
  nickname: string;
  creation_date: Date;
  @Exclude()
  email: string;
  @Exclude()
  password: string;
}
