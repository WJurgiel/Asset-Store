import {useNavigate} from "react-router-dom";
import styles from "./AppHeader.module.css"
import {ActionIcon, Autocomplete, Button, Menu, rem} from "@mantine/core";
import {IconUser, IconLogout2, IconShoppingCart, IconSearch} from '@tabler/icons-react'

export const AppHeader = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className={styles.appHeader}>
                <Button variant="transparent" color="rgba(255, 255, 255, 1)" size="xl"
                        radius="md" onClick={() => navigate('/home')}>
                    FantasticAssetStore</Button>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        width: '100%',
                        maxWidth: '400px',
                    }}
                >
                    <Autocomplete
                        placeholder="Search..."
                        data={[]}
                        styles={{
                            input: {
                                backgroundColor: '#914A74',
                                color: '#fff',
                                paddingRight: rem(40),
                            },
                        }}
                        style={{flex: 1}}
                    />
                    <ActionIcon
                        variant="filled"
                        aria-label="Search"
                        style={{
                            position: 'absolute',
                            right: rem(8),
                            backgroundColor: '#914A74',
                        }}
                    >
                        <IconSearch stroke={1.5}/>
                    </ActionIcon>
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: rem(16),
                    }}
                >
                    <ActionIcon
                        variant="subtle"
                        aria-label="Shopping Cart"
                        style={{
                            width: rem(40),
                            height: rem(40),
                        }}
                    >
                        <IconShoppingCart style={{width: '70%', height: '70%'}} stroke={1.5}/>
                    </ActionIcon>

                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Button variant="subtle" style={{padding: rem(8)}}>
                                <IconUser/>
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={<IconUser style={{width: rem(14), height: rem(14)}}/>}
                                onClick={() => navigate('/profile')}
                            >
                                Profile
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconLogout2 style={{width: rem(14), height: rem(14)}}/>}
                                onClick={() => {
                                    navigate('/login');
                                    console.log('log out');
                                }}
                            >
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>

            </div>
            <div style={{display: "flex", justifyContent: "left", flexDirection: "row", backgroundColor: "#38244F"}}>
                <Button variant="subtle" color="rgba(255, 255, 255, 1)" size="md"
                        radius="md" onClick={() => navigate('/category')}>
                    2D</Button>
                <Button variant="subtle" color="rgba(255, 255, 255, 1)" size="md"
                        radius="md" onClick={() => navigate('/category')}>
                    3D</Button>
                <Button variant="subtle" color="rgba(255, 255, 255, 1)" size="md"
                        radius="md" onClick={() => navigate('/category')}>
                    SFX</Button>
            </div>

        </div>
    )
}