import { createParamDecorator } from "@nestjs/common";

export const UserID = createParamDecorator<number>((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return request.userId;
});
