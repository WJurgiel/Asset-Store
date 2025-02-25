import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateRateDto {
  @IsNumber()
  @IsNotEmpty()
  id_user: number;

  @IsNumber()
  @IsNotEmpty()
  id_asset: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  rate: number;
}
