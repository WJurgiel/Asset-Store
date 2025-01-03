import {ActionIcon, rem} from "@mantine/core";
import {IconCube, IconMusic, IconSquare} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import AssetGrid from "../../components/AssetGrid.tsx";
import {useFetchAssets} from "../../hooks/useFetchAssets.ts";


export const MainPage = () => {
    const navigate = useNavigate();
    const {assets, loading, error} = useFetchAssets('http://localhost:3000/api/assets');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <>
            {/*welcome*/}
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "40vh"
            }}>
                <div style={{fontSize: "4rem", fontFamily: "Arial, sans-serif;"}}>Welcome to the asset store</div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <div style={{display: "flex", flexDirection: "column", fontSize: "1.5rem", textAlign: "center",}}>
                        <ActionIcon
                            variant="subtle"
                            aria-label="Shopping Cart"
                            style={{
                                width: rem(50),
                                height: rem(50),
                            }}
                            onClick={() => navigate("/Category/1")}
                        >
                            <IconSquare style={{width: '100%', height: '100%'}} stroke={1.5}/>
                        </ActionIcon>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", fontSize: "1.5rem", textAlign: "center"}}>
                        <ActionIcon
                            variant="subtle"
                            aria-label="Shopping Cart"
                            style={{
                                width: rem(50),
                                height: rem(50),
                            }}
                            onClick={() => navigate("/Category/2")}
                        >
                            <IconCube style={{width: '100%', height: '100%'}} stroke={1.5}/>
                        </ActionIcon>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", fontSize: "1.5rem", textAlign: "center"}}>
                        <ActionIcon
                            variant="subtle"
                            aria-label="Shopping Cart"
                            style={{
                                width: rem(50),
                                height: rem(50),
                            }}
                            onClick={() => navigate("/Category/3")}
                        >
                            <IconMusic style={{width: '100%', height: '100%'}} stroke={1.5}/>
                        </ActionIcon>
                    </div>
                </div>
            </div>
            {/*Recent uploads page*/}
            <div style={{fontSize: "25px", textAlign: "center", marginBottom: "5px"}}>Latest assets:</div>
            <AssetGrid assets={assets}/>
        </>
    )
}