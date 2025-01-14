import axios from "axios";

export const register = async (nickname: string, email: string, password: string): Promise<boolean> => {
    try {
        const response = await axios.post(
            'http://localhost:3000/api/user/create',
            {
                "nickname": nickname,
                "email": email,
                "password": password
            },
        );
        console.log("Created new user")
        console.log(response.data);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}