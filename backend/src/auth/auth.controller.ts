import { Controller, Post, UseGuards } from "@nestjs/common";
import { BasicGuard } from "./basic.guard";
import { UserID } from "./user.decorator";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("/login")
  @UseGuards(BasicGuard)
  login(@UserID() userId: number) {
    return userId;
  }
}
