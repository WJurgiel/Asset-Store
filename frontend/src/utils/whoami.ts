import axios from "axios";

export const whoami = async (): Promise<number | null> => {
    try {
        const response = await axios.get('http://localhost:3000/api/user/me', {withCredentials: true});
        const {ID} = response.data;
        return ID;
    } catch (error) {
        console.error("Error fetching user ID:", error);
        return null;
    }
};