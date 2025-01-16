import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import styles from './AssetListItem.module.css'
import {ActionIcon} from "@mantine/core";
import {ListTabEnum} from "../types/ListTabEnum.ts";
import {IconDownload, IconHeart, IconPencil, IconX} from "@tabler/icons-react";
import {AssetListItemProp} from "../types/AssetListItemProp.ts";
import {RatingStars} from "./RatingStars.tsx";
import {giveRating} from "../utils/giveRating.ts";
import {whoami} from "../utils/whoami.ts";
import {getCanIRateAgain} from "../utils/getCanIRateAgain.ts";

export const AssetListItem: React.FC<AssetListItemProp> = ({
                                                               ID,
                                                               name,
                                                               img_url,
                                                               averageRate,
                                                               listType
                                                           }) => {
    const [canIRateAgain, setCanIRateAgain] = useState<boolean | null>(null);
    const [userID, setUserID] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usrID = await whoami();
                setUserID(usrID);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const handleGiveRating = async (id_user: number | null, id_asset: number, rate: number) => {
        if (id_user === null) {
            console.error("Failed to retrieve user ID");
            return;
        }
        const canIRate = await getCanIRateAgain(id_user, id_asset);
        setCanIRateAgain(canIRate);
        return await giveRating(id_user, id_asset, rate);
    }
    return (
        <div className={styles.bg}>
            <img className={styles.image} src={img_url} onClick={() => navigate(`/product/${ID}`)}/>
            <h2 className={styles.assetName} onClick={() => navigate(`/product/${ID}`)}>{name}</h2>
            <div className={styles.icons}>
                {listType === ListTabEnum.bought &&
                    <RatingStars defaultValue={averageRate} rate={averageRate} isReadOnly={!canIRateAgain}
                                 fractions={2} onChange={(value) => handleGiveRating(userID, ID, value)}
                                 className={styles.rating}></RatingStars>
                }
                {listType === ListTabEnum.bought &&
                    <ActionIcon className={styles.iconFavourite} variant="outline" color="indigo" size="lg"
                                aria-label="Settings">
                        <IconHeart style={{width: '70%', height: '70%'}} stroke={1.5}/>
                    </ActionIcon>}
                {listType === ListTabEnum.uploaded &&
                    <ActionIcon className={styles.iconEdit} variant="outline" color="indigo" size="lg"
                                aria-label="Settings">
                        <IconPencil style={{width: '70%', height: '70%'}} stroke={1.5}/>
                    </ActionIcon>}
                {(listType === ListTabEnum.uploaded || listType === ListTabEnum.bought) &&
                    <ActionIcon className={styles.iconDownload} variant="outline" color="indigo" size="lg"
                                aria-label="Settings">
                        <IconDownload style={{width: '70%', height: '70%'}} stroke={1.5}/>
                    </ActionIcon>}
                {(listType === ListTabEnum.favourite || listType === ListTabEnum.uploaded) &&
                    <ActionIcon className={styles.iconDelete} variant="outline" color="indigo" size="lg"
                                aria-label="Settings">
                        <IconX style={{width: '70%', height: '70%'}} stroke={1.5}/>
                    </ActionIcon>}
            </div>
        </div>
    )
}