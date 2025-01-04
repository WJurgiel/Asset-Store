import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from "class-validator";
import { assets_type } from "@prisma/client";

export class CreateAssetsDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(2083)
  img_url: string;
  @IsNumber()
  @IsNotEmpty()
  id_author: number;

  @IsString()
  description: string;

  @IsEnum(assets_type, {
    message: "Valid type needed",
  })
  types: assets_type;

  @IsNumber()
  price: number;
}
