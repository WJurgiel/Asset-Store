import axios from "axios";

export const getMyFavourites = async (userID: number) => {
    let IDs: number[] = [];
    try {
        const response = await axios.get(
            `http://localhost:3000/api/assets/favourite?userID=${userID}`
        )
        IDs = response.data.map((e: { id_asset: number }) => {
            return e.id_asset
        })
        console.log("In hook:", IDs)
    } catch (error) {
        console.log(error);
    }
    return IDs;
}