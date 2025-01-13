import { Module } from "@nestjs/common";
import { AssetController } from "./asset.controller";
import { AssetService } from "./asset.service";
import { DatabaseService } from "../database/database.service";
import { DatabaseModule } from "../database/database.module";
import { FilebaseService } from "./filebase/filebase.service";
import { FilebaseModule } from './filebase/filebase.module';

@Module({
  controllers: [AssetController],
  providers: [AssetService, FilebaseService],
  imports: [DatabaseModule, FilebaseModule],
})
export class AssetModule {}
