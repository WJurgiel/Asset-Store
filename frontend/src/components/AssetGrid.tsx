import React, {useEffect, useState} from "react";
import axios from "axios";
import {AssetGridItem} from "./AssetGridItem.tsx";
import {AssetGridItemProps} from "../types/AssetGriditemProps.ts";

const AssetGrid: React.FC = () => {
    const [assets, setAssets] = useState<AssetGridItemProps[]>([]);
    useEffect(() => {
        axios.get('http://localhost:3000/api/assets')
            .then((res) => {
                setAssets(res.data);
            })
            .catch((err) => {
                console.log("Error fetching: ", err);
            });
    }, []);
    return (
        assets.length > 0 ?
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gridAutoRows: '400px',
                    gap: '16px',
                    marginLeft: '20px',
                    marginRight: '20px',
                    marginBottom: '20px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {assets.slice(0, 5).map((asset) => (
                    <AssetGridItem
                        key={asset.ID}
                        name={asset.name}
                        img_url={asset.img_url}
                        author={asset.users?.nickname || "Unknown"}
                        rate={asset.rate}
                        price={asset.price}
                    />
                ))}
            </div>
            :
            <div style={{overflow: 'auto', textAlign: "center",}}>It's quite quiet here!</div>
    )
}
export default AssetGrid;