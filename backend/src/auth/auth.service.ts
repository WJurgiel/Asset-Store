import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { users } from "@prisma/client";
import * as argon2 from "argon2";
@Injectable()
export class AuthService {
  constructor(private readonly database: DatabaseService) {}

  async verifyUser(email: string, password: string): Promise<users | null> {
    const user = await this.database.users.findUnique({
      where: { email: email },
    });

    if (!user) return null;
    // not working here
    console.log(user.password, password);
    const isValid = await argon2.verify(user.password, password);

    if (!isValid) return null;

    return { ...user, email, password };
  }
}
