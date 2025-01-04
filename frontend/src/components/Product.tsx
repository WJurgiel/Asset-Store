import React from "react";
import {AssetGridItemProps} from "../types/AssetGriditemProps.ts";
import styles from "../features/shop/ProductPage.module.css";
import {ActionIcon, Button, Rating} from "@mantine/core";
import {IconHeart} from "@tabler/icons-react";

const Product: React.FC<AssetGridItemProps> = ({name, author, img_url, description, upload_date, price}) => {
    const date = new Date(upload_date);
    return (
        <div className={styles.bg}>
            <div className={styles.card}>
                <div className={styles.cardProductLeft}>
                    <div className={styles.imagePlaceholder}>
                        <img
                            src={img_url}/>
                    </div>
                    <div className={styles.descriptionPlaceholder}>
                        <h2>Description:</h2>
                        <div style={{overflowWrap: "break-word", whiteSpace: "normal", width: "55vw"}}>
                            {description}
                        </div>
                    </div>
                </div>
                <div className={styles.cardProductRight}>
                    <h1>{name}</h1>
                    <div style={{display: "flex", flexDirection: "row", marginBottom: "0px"}}>
                        <h2>by:</h2>
                        <h2>{author}</h2>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", marginTop: "0px"}}>
                        <a>posted on:</a>
                        <a>{date.toLocaleDateString()}</a>
                    </div>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <Rating value={2} size="xl" readOnly/>
                        <IconHeart style={{height: "5vh", width: "5vh"}} stroke={1.5}/>
                        <h3 style={{
                            height: "5vh",
                            width: "5vh",
                            marginTop: "0px",
                            marginLeft: "5px",
                            fontSize: "1.5rem"
                        }}>9999999</h3>
                    </div>
                    <h2>{`${price}€`}</h2>
                    <div style={{display: "flex"}}>
                        <Button fullWidth>Add to cart</Button>
                        <ActionIcon variant="filled" size='lg' aria-label="Settings">
                            <IconHeart style={{width: '70%', height: '70%'}} stroke={1.5}/>
                        </ActionIcon>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;