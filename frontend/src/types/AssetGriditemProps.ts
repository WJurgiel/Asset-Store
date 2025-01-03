export type AssetGridItemProps = {
    assets: Array<{
        ID: number;
        name: string;
        img_url: string;
        author: string;
        rate: number;
        price: number;
    }>
};