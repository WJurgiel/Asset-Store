import styles from './ProductPage.module.css'
import {ActionIcon, Button, Rating} from "@mantine/core";
import {IconHeart} from "@tabler/icons-react";

export const ProductPage = () => {
    return (
        <div className={styles.bg}>
            <div className={styles.card}>
                <div className={styles.cardProductLeft}>
                    <div className={styles.imagePlaceholder}>
                        <img
                            src="https://res.cloudinary.com/dzk2ijwpn/image/upload/v1735024841/samples/animals/cat.jpg"/>
                    </div>
                    <div className={styles.descriptionPlaceholder}>
                        <h2>Description:</h2>
                        <div style={{overflowWrap: "break-word", whiteSpace: "normal", width: "55vw"}}>
                            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffasasasasasasasasasassssssssssssssssssssssssssssasasasf
                        </div>
                    </div>
                </div>
                <div className={styles.cardProductRight}>
                    <h1>Product</h1>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <h2>by:</h2>
                        <h2>author</h2>

                    </div>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <Rating defaultValue={2} size="xl" readOnly/>
                        <IconHeart style={{height: "5vh", width: "5vh"}} stroke={1.5}/>
                        <h3 style={{
                            height: "5vh",
                            width: "5vh",
                            marginTop: "0px",
                            marginLeft: "5px",
                            fontSize: "1.5rem"
                        }}>9999999</h3>
                    </div>
                    <h2>3€</h2>
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