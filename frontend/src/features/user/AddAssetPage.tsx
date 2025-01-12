import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const AddAssetPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3000/api/user/me', {withCredentials: true})
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
                navigate("/login")
            });
    }, [navigate])
    return (
        <div>

        </div>
    )
}