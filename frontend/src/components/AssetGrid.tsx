import React, {useEffect, useState} from "react";
import axios from "axios";
import {AssetGridItem} from "./AssetGridItem.tsx";

const AssetGrid: React.FC = () => {
    const [assets, setAssets] = useState([]);
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
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, 300px)',
                gridAutoRows: '400px',
                gap: '16px',
                justifyContent: 'center',
            }}
        >
            {assets.map((asset) => (
                <AssetGridItem
                    key={asset.ID}
                    name={asset.name}
                    img={asset.img_url}
                    author={asset.users.name}
                    rate={asset.rate}
                    price={asset.price}
                />
            ))}
        </div>
    )
}
export default AssetGrid;