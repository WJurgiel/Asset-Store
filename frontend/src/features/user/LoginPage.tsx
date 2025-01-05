import styles from "./LoginPage.module.css"
import {Button, Input, PasswordInput, rem, Stack, Text} from "@mantine/core";
import {IconAt, IconLock} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.bg}>
            <div className={styles.loginForm}>
                <Stack>
                    <Text className={styles.loginText}>Login</Text>
                    <Input className={styles.inputField} placeholder="Your email" leftSection={<IconAt size={16}/>}/>
                    <PasswordInput className={styles.inputField}
                                   leftSection={<IconLock style={{width: rem(18), height: rem(18)}} stroke={1.5}/>}
                                   placeholder="With left section"/>
                    <Button onClick={() => {
                        navigate('/register')
                    }} variant="transparent">No account? Create one!</Button>
                    <Button className={styles.loginButton} variant="filled">Login!</Button>
                </Stack>
            </div>
        </div>
    )
}