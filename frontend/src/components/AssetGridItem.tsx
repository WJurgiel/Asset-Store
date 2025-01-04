import React from 'react'
import {AssetGridItemProps} from "../types/AssetGriditemProps.ts";
import {Rating} from "@mantine/core";
import {IconHeart, IconShoppingCartPlus} from "@tabler/icons-react";
import styles from './AssetGridItem.module.css'
import {useNavigate} from "react-router-dom";

export const AssetGridItem: React.FC<AssetGridItemProps> = ({ID, name, img_url, author, rate, price}) => {
    const navigate = useNavigate();
    return (
        <div className={styles.card} onClick={() => navigate(`/product/${ID}`)}>
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
                <img
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
                <div className={styles.nameLabel}>{name}</div>
                <div className={styles.authorLabel}>{author}</div>
            </div>
            <div
                style={{
                    marginTop: '4px',
                    textAlign: 'center',
                }}
            >
                <Rating value={rate} fractions={2} readOnly/>
            </div>
            <div style={{color: '#555', fontSize: '14px'}}>{`PRICE: ${price} ZL`}</div>
            {/*action buttons*/}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'left',
            }}>
                <IconHeart className={styles.icon}></IconHeart>
                <IconShoppingCartPlus className={styles.icon}></IconShoppingCartPlus>
            </div>
        </div>
    );
};