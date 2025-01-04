import { Module } from "@nestjs/common";
import { AssetController } from "./asset.controller";
import { AssetService } from "./asset.service";
import { DatabaseService } from "../database/database.service";
import { DatabaseModule } from "../database/database.module";

@Module({
  controllers: [AssetController],
  providers: [AssetService],
  imports: [DatabaseModule],
})
export class AssetModule {}
