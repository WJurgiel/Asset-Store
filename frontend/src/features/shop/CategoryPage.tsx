import {useParams} from "react-router-dom";
import styles from "./CategoryPage.module.css"
import AssetGrid from "../../components/AssetGrid.tsx";
import {useFetchAssets} from "../../hooks/useFetchAssets.ts";

export const CategoryPage = () => {
    const {id} = useParams();
    const {assets, loading, error} = useFetchAssets(`http://localhost:3000/api/assets/category/${id}`);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className={styles.catalogBg}>
            <AssetGrid assets={assets}/>
        </div>
    )
}