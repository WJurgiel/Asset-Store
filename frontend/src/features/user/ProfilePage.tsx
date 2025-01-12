import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import styles from "./ProfilePage.module.css"
import {Button, Loader} from "@mantine/core";
import {IconPlus} from "@tabler/icons-react";
import {getCookie} from "../../utils/getCookie.ts";

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
        return <Loader color="blue"/>;
    }
    const handleAddForm = () => {
        if (getCookie("is-logged") === "true") {
            navigate("/add");
        } else {
            navigate("*")
        }
    }
    return (
        <div className={styles.bg}>
            <h1>Welcome, {user?.nickname}!</h1>
            <Button className={styles.addButton} rightSection={<IconPlus size={14}/>} onClick={handleAddForm}>Add new
                asset</Button>
            <div className={styles.container}>
                <div className={styles.list}>
                    <a>kupione assety</a>
                </div>
                <div className={styles.list}>
                    <a>twoje assety</a>
                </div>
            </div>
        </div>
    )
}