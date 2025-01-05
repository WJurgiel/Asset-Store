import {useFetchSingleAsset} from "../../hooks/useFetchSingleAsset.ts";
import {useParams} from "react-router-dom";
import {Loader} from "@mantine/core";
import Product from "../../components/Product.tsx";

export const ProductPage = () => {
    const {id} = useParams();
    const {
        asset,
        loading,
        error
    } = useFetchSingleAsset(`http://localhost:3000/api/assets/product/${id}`);
    if (loading) return <Loader color="blue"/>;
    if (error) return <p>Error: {error}</p>;
    return (
        <Product name={asset.name} author={asset.users?.nickname} img_url={asset.img_url}
                 description={asset.description} averageRate={asset.averageRate} totalFavorites={asset.totalFavorites}
                 upload_date={asset.upload_date}
                 price={asset.price}></Product>
    )
}