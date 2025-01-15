import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { CreateAssetsDto } from "./Dto/create-asset.dto";
import { CreateRateDto } from "./Dto/create-rate.dto";
import { assets_type } from "@prisma/client";

@Injectable()
export class AssetService {
  constructor(private readonly database: DatabaseService) {}

  findNewest() {
    return this.database.assets
      .findMany({
        include: {
          users: true,
          rates_rates_id_assetToassets: {
            select: {
              rate: true,
            },
          },
        },
        orderBy: {
          upload_date: "desc",
        },
        take: 6,
      })
      .then((assets) =>
        assets.map((asset) => {
          // Calculate average rate
          const rates = asset.rates_rates_id_assetToassets;
          const averageRate =
            rates.length > 0
              ? rates.reduce((sum, rate) => sum + rate.rate, 0) / rates.length
              : null;

          return {
            ...asset,
            averageRate,
          };
        }),
      );
  }

  async findCategory(id: number, skip: number, limit: number, sort: any) {
    return this.database.assets
      .findMany({
        orderBy: sort,
        include: {
          users: true,
          rates_rates_id_assetToassets: {
            select: {
              rate: true,
            },
          },
        },
        where: {
          type: id === 1 ? "twoD" : id === 2 ? "threeD" : "SFX",
        },
        skip,
        take: limit,
      })
      .then((assets) =>
        assets.map((asset) => {
          // Calculate average rate
          const rates = asset.rates_rates_id_assetToassets;
          const averageRate =
            rates.length > 0
              ? rates.reduce((sum, rate) => sum + rate.rate, 0) / rates.length
              : null;

          return {
            ...asset,
            averageRate,
          };
        }),
      );
  }

  async countAssetsByCategory(id: number) {
    return this.database.assets.count({
      where: {
        type: id === 1 ? "twoD" : id === 2 ? "threeD" : "SFX",
      },
    });
  }

  async findOne(id: number) {
    return this.database.assets
      .findUnique({
        where: {
          ID: id,
        },
        include: {
          users: {
            select: {
              nickname: true,
            },
          },
          rates_rates_id_assetToassets: {
            select: {
              rate: true,
            },
          },
          favorites: {
            select: {
              ID: true,
            },
          },
        },
      })
      .then((asset) => {
        if (!asset) {
          return null;
        }
        const rates = asset.rates_rates_id_assetToassets;
        const averageRate =
          rates.length > 0
            ? rates.reduce((sum, rate) => sum + rate.rate, 0) / rates.length
            : 0;
        const totalFavorites = asset.favorites.length;
        return {
          ...asset,
          averageRate,
          totalFavorites,
        };
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

  async userAssets(userID: number) {
    const bought = await this.database.transactions.findMany({
      where: {
        id_user: userID,
        type: "bought",
      },
      include: {
        assets: true,
      },
    });
    const uploaded = await this.database.transactions.findMany({
      where: {
        id_user: userID,
        type: "uploaded",
      },
      include: {
        assets: true,
      },
    });
    const favourites = await this.database.favorites.findMany({
      where: {
        id_user: userID,
      },
      include: {
        assets: true,
      },
    });
    return {
      boughtAssets: bought.map((tr) => tr.assets),
      uploadedAssets: uploaded.map((up) => up.assets),
      favouriteAssets: favourites.map((fav) => fav.assets),
    };
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

  async createNoDto(
    name: string,
    img_url: string,
    id_author: number,
    description: string,
    type: assets_type,
    price: number,
  ) {
    return this.database.assets.create({
      data: {
        name: name,
        img_url: img_url,
        id_author: id_author,
        description: description,
        type: type,
        price: price,
      },
    });
  }

  async countAssetsByUser(author_id: number) {
    return this.database.assets.count({
      where: {
        id_author: author_id,
      },
    });
  }

  createRate(createRateDto: CreateRateDto) {
    return this.database.rates.create({
      data: {
        id_user: createRateDto.id_user,
        id_asset: createRateDto.id_asset,
        rate: createRateDto.rate,
      },
    });
  }

  getAverageAssetRate(id: number) {
    return this.database.rates.aggregate({
      where: {
        id_asset: id,
      },
      _avg: {
        rate: true,
      },
    });
  }

  giveRating(userID: number, assetID: number, rate: number) {
    return this.database.rates.create({
      data: {
        id_user: userID,
        id_asset: assetID,
        rate: rate,
      },
    });
  }
  async getLinkToAsset(assetID: number) {
    return this.database.assets.findFirst({
      where: {
        ID: assetID,
      },
      select: {
        img_url: true,
      },
    });
  }
  async findFavourite(userID: number, assetID: number) {
    return this.database.favorites.findFirst({
      where: {
        id_asset: assetID,
        id_user: userID,
      },
      select: {
        ID: true,
      },
    });
  }
  async removeFavourites(ID: number) {
    return this.database.favorites.delete({
      where: {
        ID: ID,
      },
    });
  }
  async addToFavourites(userID: number, assetID: number) {
    await this.database.favorites.create({
      data: {
        id_user: userID,
        id_asset: assetID,
      },
    });
    console.log("added");
  }
}
