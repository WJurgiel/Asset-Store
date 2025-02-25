import styles from "./LoginPage.module.css";
import {Button, Input, PasswordInput, rem, Stack, Text} from "@mantine/core";
import {IconAt, IconLock, IconUser} from "@tabler/icons-react";
import {useState} from "react";
import {register} from "../../utils/register.ts";
import {useNavigate} from "react-router-dom";

export const RegisterPage = () => {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleRegister = async () => {
        const success = await register(nickname, email, password) && nickname && email && password;
        if (success) {
            navigate("/login");
        } else {
            setError("Couldn't create an user");
        }
    }
    return (
        <div className={styles.bg}>
            <div className={styles.registerForm}>
                <Stack>
                    <Text className={styles.loginText}>Register</Text>
                    <Input className={styles.inputField} placeholder="Your nickname"
                           leftSection={<IconUser size={16}/>} value={nickname}
                           onChange={(e) => setNickname(e.target.value)}/>
                    <Input className={styles.inputField} placeholder="Your email" leftSection={<IconAt size={16}/>}
                           value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <PasswordInput className={styles.inputField}
                                   leftSection={<IconLock style={{width: rem(18), height: rem(18)}} stroke={1.5}/>}
                                   placeholder="Your password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                    <Button className={styles.loginButton} variant="filled" onClick={handleRegister}>Create
                        account!</Button>
                    {error && <Text color={"red"}>{error}</Text>}
                </Stack>
            </div>
        </div>
    )
}