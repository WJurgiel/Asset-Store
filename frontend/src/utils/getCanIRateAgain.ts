import axios from "axios";

export const getCanIRateAgain = async (id_user: number | null, id_asset: number) => {
    try {
        const response = await axios.get(
            `http://localhost:3000/api/assets/rating?userID=${id_user}&assetID=${id_asset}`
        )
        const canIRate = response.data
        return !canIRate;
    } catch (error) {
        console.log("Error fetching your ability to rate: ", error);
        return null;
    }
}