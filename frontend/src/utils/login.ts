import axios from "axios";

export const login = async (email: string, password: string): Promise<boolean> => {
    // const email = 'example6@home.com';
    // const password = 'password123456';
    const token = btoa(`${email}:${password}`);
    try {
        const response = await axios.post(
            'http://localhost:3000/api/auth/login',
            {},
            {
                headers: {
                    Authorization: `Basic ${token}`,
                },
                withCredentials: true,
            }
        );
        console.log("Logged in")
        console.log(response.data);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }


}
