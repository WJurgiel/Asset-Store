import styles from "./LoginPage.module.css";
import {Button, Input, PasswordInput, rem, Stack, Text} from "@mantine/core";
import {IconAt, IconLock, IconUser} from "@tabler/icons-react";

export const RegisterPage = () => {
    return (
        <div className={styles.bg}>
            <div className={styles.registerForm}>
                <Stack>
                    <Text className={styles.loginText}>Register</Text>
                    <Input className={styles.inputField} placeholder="Your nickname"
                           leftSection={<IconUser size={16}/>}/>
                    <Input className={styles.inputField} placeholder="Your email" leftSection={<IconAt size={16}/>}/>
                    <PasswordInput className={styles.inputField}
                                   leftSection={<IconLock style={{width: rem(18), height: rem(18)}} stroke={1.5}/>}
                                   placeholder="Your password"/>
                    <Button className={styles.loginButton} variant="filled">Create account!</Button>
                </Stack>
            </div>
        </div>
    )
}