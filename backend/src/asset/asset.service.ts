import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { CreateAssetsDto } from "./Dto/create-asset.dto";

@Injectable()
export class AssetService {
  constructor(private readonly database: DatabaseService) {}
  findNewest() {
    return this.database.assets.findMany({
      include: {
        users: true,
      },
      orderBy: {
        upload_date: "asc",
      },
      take: 5,
    });
  }
  async findCategory(id: number, skip: number, limit: number, sort: any) {
    return this.database.assets.findMany({
      orderBy: sort,
      include: {
        users: true,
      },
      where: {
        type: id === 1 ? "twoD" : id === 2 ? "threeD" : "SFX",
      },
      skip,
      take: limit,
    });
  }
  async countAssetsByCategory(id: number) {
    return this.database.assets.count({
      where: {
        type: id === 1 ? "twoD" : id === 2 ? "threeD" : "SFX",
      },
    });
  }
  async findOne(id: number) {
    return this.database.assets.findUnique({
      include: {
        users: {
          select: {
            nickname: true,
          },
        },
      },
      where: {
        ID: id,
      },
    });
  }
  async searchAssets(query: string) {
    return this.database.assets.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      select: {
        ID: true,
        name: true,
      },
    });
  }
  create(createAssetDto: CreateAssetsDto) {
    return this.database.assets.create({
      data: {
        name: createAssetDto.name,
        img_url: createAssetDto.img_url,
        id_author: createAssetDto.id_author,
        description: createAssetDto.description,
        type: createAssetDto.types,
        price: createAssetDto.price,
      },
    });
  }
}
