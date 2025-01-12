import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/user/me', {withCredentials: true})
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                navigate("/login")
            });
    }, [navigate])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome, {user?.nickname}!</h1>
            <p>Email: {user?.email}</p>
        </div>
    )
}