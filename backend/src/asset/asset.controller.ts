import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Query,
  Res,
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
import { Response } from "express";
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
  @Get("/profile/:id")
  async userAssets(@Param("id", ParseIntPipe) id: number) {
    return this.assetService.userAssets(id);
  }
  @Get("/search")
  async searchAssets(@Query("query") query: string) {
    return this.assetService.searchAssets(query);
  }
  @Get("/rating/:id")
  async getAverageAssetRate(@Param("id", ParseIntPipe) id: number) {
    return this.assetService.getAverageAssetRate(id);
  }
  @Get("/download/:id")
  async downloadAsset(
    @Param("id", ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const { img_url } = await this.assetService.getLinkToAsset(id);
    if (!img_url) {
      throw new HttpException("Key not Found", HttpStatus.NOT_FOUND);
    }
    try {
      const fileStream =
        await this.filebaseService.downloadAssetMockUp(img_url);
      res.set({
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${img_url}"`,
      });
      fileStream.pipe(res);
    } catch (error) {
      throw new HttpException(
        `Failed to download file: ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  @Get("/favourite")
  getMyFavourites(@Query("userID", ParseIntPipe) id: number) {
    return this.assetService.getMyFavourites(id);
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
    const assetsFromUser = await this.assetService.countAssetsByUser(
      Number(userID),
    );
    const filePath = `${userID}/${assetsFromUser}/${originalname}`;
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
  async createRate(@Body(ValidationPipe) createRateDto: CreateRateDto) {
    const { id_user, id_asset } = createRateDto;
    const isAlreadyRatedByMe =
      await this.assetService.getIsAssetAlreadyRatedByMe(id_user, id_asset);
    if (!isAlreadyRatedByMe) {
      return this.assetService.createRate(createRateDto);
    }
    return {
      message: "Couldn't add rate, because you already did that",
      error: "Bad Request",
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }
  @Post("/favourite")
  async toggleFavourites(
    @Query("userID", ParseIntPipe) userID: number,
    @Query("assetID", ParseIntPipe) assetID: number,
  ) {
    try {
      const favouriteEntry = await this.assetService.findFavourite(
        userID,
        assetID,
      );
      if (favouriteEntry) {
        const { ID } = favouriteEntry;
        await this.assetService.removeFavourites(ID);
        return {
          message: `favourite removed for userID=${userID} && assetID=${assetID}`,
        };
      }
      await this.assetService.addToFavourites(userID, assetID);
      return {
        message: `favourite added for userID=${userID} && assetID=${assetID}`,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to toggle favourites ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
