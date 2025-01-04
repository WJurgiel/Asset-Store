import {useParams, useSearchParams} from "react-router-dom";
import styles from "./CategoryPage.module.css"
import AssetGrid from "../../components/AssetGrid.tsx";
import {useFetchAssets} from "../../hooks/useFetchAssets.ts";
import {NativeSelect, Pagination} from "@mantine/core";

export const CategoryPage = () => {
    const {id} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || '1', 10);
    const limit = 6;
    const {
        assets,
        totalCount,
        loading,
        error
    } = useFetchAssets(`http://localhost:3000/api/assets/category/${id}?page=${page}&limit=${limit}`);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <>
            <div>2D assets</div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <NativeSelect style={{width: "10%"}}
                              radius="md" label="Sort by:"
                              data={[
                                  {value: "priceAsc", label: 'Price (lowest to highest)'},
                                  {value: 'priceDesc', label: 'Price (highest to lowest)'},
                                  {value: 'ratingBest', label: 'Rating (best)'},
                                  {value: 'ratingWorst', label: 'Rating (worst)'},
                                  {value: 'popularity', label: 'Popularity'}
                              ]}/>
            </div>

            <div className={styles.catalogBg}>
                <AssetGrid assets={assets}/>
            </div>
            <Pagination style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "15px"
            }} total={Math.ceil(totalCount / limit)}
                        value={page}
                        onChange={(newPage) => {
                            setSearchParams({page: newPage.toString()})
                        }}
                        color="pink"/>
        </>

    )
}