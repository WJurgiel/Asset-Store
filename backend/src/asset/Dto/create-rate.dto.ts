import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateRateDto {
  @IsNumber()
  @IsNotEmpty()
  id_user: number;

  @IsNumber()
  @IsNotEmpty()
  id_asset: number;

  @IsNumber()
  @IsNotEmpty()
  rate: number;
}
