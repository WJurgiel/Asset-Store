import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { AssetService } from "./asset.service";
import { CreateAssetsDto } from "./Dto/create-asset.dto";

@Controller("assets")
export class AssetController {
  constructor(private readonly assetService: AssetService) {}
  @Get()
  async findNewest() {
    const assets = await this.assetService.findNewest();
    return { assets };
  }
  @Get("/category/:id")
  async findCategory(
    @Param("id", ParseIntPipe) id: number,
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number,
    @Query("sort") sort: string,
  ) {
    if (![1, 2, 3].includes(id)) {
      throw new NotFoundException("Not Found");
    }
    const sortOptions: Record<string, any> = {
      alphabetical: { name: "asc" },
      priceAsc: { price: "asc" },
      priceDesc: { price: "desc" },
      ratingBest: { rating: "desc" },
      ratingWorst: { rating: "asc" },
      popularity: { popularity: "desc" },
    };

    const sortOrder = sortOptions[sort] || sortOptions["priceAsc"];

    const skip = (page - 1) * limit;
    const assets = await this.assetService.findCategory(
      id,
      skip,
      limit,
      sortOrder,
    );
    const totalCount = await this.assetService.countAssetsByCategory(id);
    return { assets, totalCount };
  }
  @Get("/product/:id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.assetService.findOne(id);
  }
  @Get("/search")
  async searchAssets(@Query("query") query: string) {
    return this.assetService.searchAssets(query);
  }
  @Post()
  create(@Body(ValidationPipe) createAssetDto: CreateAssetsDto) {
    return this.assetService.create(createAssetDto);
  }
}
