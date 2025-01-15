import axios from "axios";

export const toggleFavourites = async (userID: number, assetID: number) => {
    try {
        await axios.post(
            `http://localhost:3000/api/assets/favourite?userID=${userID}&assetID=${assetID}`
        )
    } catch (error) {
        console.log(error);
    }
}