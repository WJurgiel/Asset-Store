import {useEffect, useState} from "react";
import axios from "axios";

export const useFetchProfileAssets = (endpoint: string) => {
    const [boughtAssets, setBoughtAssets] = useState([])
    const [favouriteAssets, setFavouriteAssets] = useState([])
    const [uploadedAssets, setUploadedAssets] = useState([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        axios.get(endpoint).then((response) => {
            setBoughtAssets(response.data.boughtAssets);
            setFavouriteAssets(response.data.favouriteAssets);
            setUploadedAssets(response.data.uploadedAssets);
        }).catch((err) => {
            setError(err)
        })
    }, [endpoint])
    return {boughtAssets, favouriteAssets, uploadedAssets, error}
}