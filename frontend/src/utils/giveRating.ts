import axios from "axios";

export const giveRating = async (id_user: number | null, id_asset: number, rate: number) => {
    try {
        await axios.post(
            `http://localhost:3000/api/assets/rating`,
            {
                id_user, id_asset, rate
            }
        )
    } catch (error) {
        console.log(error);
    }
}