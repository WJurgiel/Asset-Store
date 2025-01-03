import { CreateAssetsDto } from "./create-asset.dto";
import { PartialType } from "@nestjs/mapped-types";
export class UpdateUserDto extends PartialType(CreateAssetsDto) {}
