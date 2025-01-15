import React, {useState} from 'react'
import {AssetGridItemProps} from "../types/AssetGriditemProps.ts";
import {Rating} from "@mantine/core";
import {IconHeart, IconHeartFilled, IconShoppingCartPlus} from "@tabler/icons-react";
import styles from './AssetGridItem.module.css'
import {useNavigate} from "react-router-dom";
import {toggleFavourites} from "../utils/toggleFavourites.ts";
import {whoami} from "../utils/whoami.ts";

export const AssetGridItem: React.FC<AssetGridItemProps> = ({
                                                                ID,
                                                                name,
                                                                img_url,
                                                                author,
                                                                averageRate,
                                                                price
                                                            }) => {
    const [isAssetFavourite, setIsAssetFavourite] = useState(false);
    const navigate = useNavigate();
    const handleFavourites = async () => {
        const userID = await whoami();
        if (userID === null) {
            console.error("Failed to retrieve user ID");
            return;
        }
        console.log("User ID:", userID);

        setIsAssetFavourite(!isAssetFavourite);
        return toggleFavourites(userID, ID);
    }
    return (
        <div className={styles.card}>
            <div
                style={{
                    width: '100%',
                    height: '200px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#EBEFF3',
                    border: '1px solid #ddd',
                }}
            >
                <img onClick={() => navigate(`/product/${ID}`)}
                     src={img_url}
                     alt={`${name} by ${author}`}
                     style={{
                         maxWidth: '100%',
                         maxHeight: '100%',
                         objectFit: 'cover',
                     }}
                />
            </div>
            <div
                style={{
                    marginTop: '10px',
                    textAlign: 'left',
                }}
            >
                <div className={styles.nameLabel} onClick={() => navigate(`/product/${ID}`)}>{name}</div>
                <div className={styles.authorLabel}>{author}</div>
            </div>
            <div
                style={{
                    marginTop: '4px',
                    textAlign: 'center',
                }}
            >
                <Rating value={averageRate} fractions={2} readOnly/>
            </div>
            <div style={{color: '#555', fontSize: '14px'}}>{`PRICE: ${price} ZL`}</div>
            {/*action buttons*/}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'left',
            }}>
                {!isAssetFavourite && <IconHeart onClick={handleFavourites} className={styles.icon}></IconHeart>}
                {isAssetFavourite &&
                    <IconHeartFilled onClick={handleFavourites} className={styles.icon}></IconHeartFilled>}
                <IconShoppingCartPlus className={styles.icon}></IconShoppingCartPlus>
            </div>
        </div>
    );
};