import {ActionIcon, rem} from "@mantine/core";
import {IconCube, IconMusic, IconSquare} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import {AssetGridItem} from "../../components/AssetGridItem.tsx";

const data = [
    {
        imageSrc: 'https://res.cloudinary.com/dzk2ijwpn/image/upload/v1735024841/samples/animals/cat.jpg',
        title: 'Title 1',
        author: 'Author1',
        rate: 5
    },
    {
        imageSrc: 'https://res.cloudinary.com/dzk2ijwpn/image/upload/v1735024842/samples/food/fish-vegetables.jpg',
        title: 'Title 2',
        author: 'Author 2',
        rate: 2.5,
    },
];
export const MainPage = () => {
    const navigate = useNavigate();
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
            <div>
                {/*placeholder for recent projects, grid*/}
                <h1 style={{padding: "0 16px"}}>Checkout newest assets!</h1>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, 300px)',
                        gridAutoRows: '400px',
                        gap: '16px',
                        justifyContent: 'center',
                    }}
                >
                    {data.map((item, index) => (
                        <AssetGridItem
                            key={index}
                            imageSrc={item.imageSrc}
                            title={item.title}
                            author={item.author}
                            rate={item.rate}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}