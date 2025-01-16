import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import styles from "./ProfilePage.module.css"
import {Button, Loader, Tabs} from "@mantine/core";
import {IconHeart, IconPlus, IconShoppingCartCheck, IconUpload} from "@tabler/icons-react";
import {getCookie} from "../../utils/getCookie.ts";
import {AssetListItem} from "../../components/AssetListItem.tsx";
import {ListTabEnum} from "../../types/ListTabEnum.ts";
import {useFetchProfileAssets} from "../../hooks/useFetchProfileAssets.ts";
import {whoami} from "../../utils/whoami.ts";

export const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [userID, setUserID] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/user/me', {withCredentials: true})
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                navigate("/login")
            });
    }, [])
    const {
        boughtAssets,
        uploadedAssets,
        favouriteAssets,
    } = useFetchProfileAssets(`http://localhost:3000/api/assets/profile/${user?.ID}`)

    if (loading) {
        return <Loader color="blue"/>;
    }
    // if (error) return <p>Error: {error}</p>;
    const handleAddForm = () => {
        if (getCookie("is-logged") === "true") {
            navigate("/add");
        } else {
            navigate("*")
        }
    }
    return (
        <div className={styles.bg}>
            <h1>Welcome, {user?.nickname}!</h1>
            <Button className={styles.addButton} rightSection={<IconPlus size={14}/>} onClick={handleAddForm}>Upload new
                asset</Button>
            <div className={styles.container}>
                <Tabs defaultValue="bought">
                    <Tabs.List>
                        <Tabs.Tab value="bought" leftSection={<IconShoppingCartCheck size={12}/>}>
                            Bought assets
                        </Tabs.Tab>
                        <Tabs.Tab value="favourites" leftSection={<IconHeart size={12}/>}>
                            Favourite assets
                        </Tabs.Tab>
                        <Tabs.Tab value="uploaded" leftSection={<IconUpload size={12}/>}>
                            Uploaded assets
                        </Tabs.Tab>
                    </Tabs.List>
                    <div className={styles.panel}>
                        <Tabs.Panel value="bought">
                            {boughtAssets.map((asset) => (
                                <AssetListItem
                                    key={asset.ID}
                                    ID={asset.ID}
                                    name={asset.name}
                                    img_url={asset.img_url}
                                    averageRate={asset.averageRate}
                                    listType={ListTabEnum.bought}
                                />
                            ))}
                        </Tabs.Panel>

                        <Tabs.Panel value="favourites">
                            {favouriteAssets.map((asset) => (
                                <AssetListItem
                                    key={asset.ID}
                                    ID={asset.ID}
                                    name={asset.name}
                                    img_url={asset.img_url}
                                    averageRate={asset.averageRate}
                                    listType={ListTabEnum.favourite}
                                />
                            ))}
                        </Tabs.Panel>

                        <Tabs.Panel value="uploaded">
                            {uploadedAssets.map((asset) => (
                                <AssetListItem
                                    key={asset.ID}
                                    ID={asset.ID}
                                    name={asset.name}
                                    img_url={asset.img_url}
                                    averageRate={asset.averageRate}
                                    listType={ListTabEnum.uploaded}
                                />
                            ))}
                        </Tabs.Panel>
                    </div>

                </Tabs>
            </div>
        </div>
    )
}