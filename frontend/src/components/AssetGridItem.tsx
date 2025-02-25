import React, {useEffect, useState} from 'react'
import {AssetGridItemProps} from "../types/AssetGriditemProps.ts";
import {IconHeart, IconHeartFilled, IconShoppingCartPlus} from "@tabler/icons-react";
import styles from './AssetGridItem.module.css'
import {useNavigate} from "react-router-dom";
import {toggleFavourites} from "../utils/toggleFavourites.ts";
import {whoami} from "../utils/whoami.ts";
import {getMyFavourites} from "../utils/getMyFavourites.ts";
import {RatingStars} from "./RatingStars.tsx";

export const AssetGridItem: React.FC<AssetGridItemProps> = ({
                                                                ID,
                                                                name,
                                                                img_url,
                                                                author,
                                                                averageRate,
                                                                price
                                                            }) => {
    const [isAssetFavourite, setIsAssetFavourite] = useState(false);
    const [userID, setUserID] = useState<number | null>(null);
    const [myFavourites, setMyFavourites] = useState<number[] | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const usrId = await whoami();
                setUserID(usrId);

                const fav = await getMyFavourites(usrId);
                setMyFavourites(fav);

                if (fav.includes(ID)) {
                    setIsAssetFavourite(true);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
        console.log(myFavourites)

    }, []);
    const handleFavourites = async () => {
        if (userID === null) {
            console.error("Failed to retrieve user ID");
            return;
        }
        console.log("User ID:", userID);
        const myFavourites = await getMyFavourites(userID);
        console.log(myFavourites);
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
                <RatingStars defaultValue={averageRate} rate={averageRate} fractions={2}
                             isReadOnly={true}></RatingStars>
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