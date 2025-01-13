import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { AssetService } from "./asset.service";
import { CreateAssetsDto } from "./Dto/create-asset.dto";
import { CreateRateDto } from "./Dto/create-rate.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilebaseService } from "./filebase/filebase.service";
import { assets_type } from "@prisma/client";
@Controller("assets")
export class AssetController {
  constructor(
    private readonly assetService: AssetService,
    private readonly filebaseService: FilebaseService,
  ) {}
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
  @Get("/rating/:id")
  async getAverageAssetRate(@Param("id", ParseIntPipe) id: number) {
    return this.assetService.getAverageAssetRate(id);
  }
  @Post()
  create(@Body(ValidationPipe) createAssetDto: CreateAssetsDto) {
    return this.assetService.create(createAssetDto);
  }
  @Post("/upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: "image/png" }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body()
    body: {
      userID: string;
      name: string;
      assetDescription: string;
      assetType: string;
      assetPrice: string;
    },
  ) {
    const { buffer, originalname } = file;
    const { userID, name, assetDescription, assetType, assetPrice } = body;
    const filePath = `${userID}/${originalname}`;
    const uploadedObject = await this.filebaseService.uploadFile(
      filePath,
      buffer,
    );
    const { cid } = uploadedObject;
    const link = `${process.env.FILEBASE_GATEWAY}${cid}`;
    const type: assets_type =
      assetType === "twoD"
        ? assets_type.twoD
        : assetType === "threeD"
          ? assets_type.threeD
          : assets_type.SFX;
    await this.assetService.createNoDto(
      name,
      link,
      Number(userID),
      assetDescription,
      type,
      Number(assetPrice),
    );
    return {
      asset: `${name} ${assetDescription} ${assetType} ${assetPrice}`,
      link: `${process.env.FILEBASE_GATEWAY}${cid}`,
      message: "File uploaded successfully",
      data: uploadedObject,
    };
  }

  @Post("/rating")
  createRate(@Body(ValidationPipe) createRateDto: CreateRateDto) {
    return this.assetService.createRate(createRateDto);
  }
}
