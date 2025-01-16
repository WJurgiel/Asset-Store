import React from 'react'
import {useNavigate} from "react-router-dom";
import styles from './AssetListItem.module.css'
import {ActionIcon} from "@mantine/core";
import {ListTabEnum} from "../types/ListTabEnum.ts";
import {IconDownload, IconHeart, IconPencil, IconX} from "@tabler/icons-react";
import {AssetListItemProp} from "../types/AssetListItemProp.ts";
import {RatingStars} from "./RatingStars.tsx";

export const AssetListItem: React.FC<AssetListItemProp> = ({
                                                               ID,
                                                               name,
                                                               img_url,
                                                               averageRate,
                                                               listType
                                                           }) => {
    const navigate = useNavigate();
    const handleGiveRating = () => {
        console.log("rate given");
    }
    return (
        <div className={styles.bg}>
            <img className={styles.image} src={img_url} onClick={() => navigate(`/product/${ID}`)}/>
            <h2 className={styles.assetName} onClick={() => navigate(`/product/${ID}`)}>{name}</h2>
            <div className={styles.icons}>
                {listType === ListTabEnum.bought &&
                    <RatingStars defaultValue={averageRate} rate={averageRate} isReadOnly={false}
                                 fractions={2} onChange={handleGiveRating} className={styles.rating}></RatingStars>
                    // <Rating className={styles.rating} defaultValue={averageRate} fractions={2}/>
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