import styles from "./LoginPage.module.css"
import {Button, Input, PasswordInput, rem, Stack, Text} from "@mantine/core";
import {IconAt, IconLock} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {login} from "../../utils/login.ts";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const success = await login(email, password);
        console.log("Success: ", success);
        if (success) {
            navigate("/profile")
        } else {
            setError("Invalid email or password");
        }
    }
    return (
        <div className={styles.bg}>
            <div className={styles.loginForm}>
                <Stack>
                    <Text className={styles.loginText}>Login</Text>
                    <Input className={styles.inputField} placeholder="Your email" leftSection={<IconAt size={16}/>}
                           value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <PasswordInput className={styles.inputField}
                                   leftSection={<IconLock style={{width: rem(18), height: rem(18)}} stroke={1.5}/>}
                                   placeholder="With left section" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                    {error && <Text color={"red"}>{error}</Text>}
                    <Button onClick={() => {
                        navigate('/register')
                    }} variant="transparent">No account? Create one!</Button>
                    <Button className={styles.loginButton} variant="filled" onClick={handleLogin}>Login!</Button>
                </Stack>
            </div>
        </div>
    )
}