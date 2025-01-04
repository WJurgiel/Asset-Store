import React from "react";
import {AssetGridItem} from "./AssetGridItem.tsx";
import {AssetGridItemProps} from "../types/AssetGriditemProps.ts";

const AssetGrid: React.FC<AssetGridItemProps> = ({assets}) => {
    return (
        assets.length > 0 ?
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridAutoRows: '400px',
                    gap: '16px',
                    marginLeft: '20px',
                    marginRight: '20px',
                    marginBottom: '20px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {assets.map((asset) => (
                    <AssetGridItem
                        key={asset.ID}
                        ID={asset.ID}
                        name={asset.name}
                        img_url={asset.img_url}
                        author={asset.users?.nickname || "Unknown"}
                        rate={asset.rate || 0}
                        price={asset.price}
                    />
                ))}
            </div>
            :
            <div style={{overflow: 'auto', textAlign: "center",}}>It's quite quiet here!</div>
    )
}
export default AssetGrid;