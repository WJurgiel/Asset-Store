import {ListTabEnum} from "./ListTabEnum.ts";

export type AssetListItemProp = {
    ID: number;
    name: string;
    img_url: string;
    averageRate: number;
    listType: ListTabEnum;
}