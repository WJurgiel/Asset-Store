import {useParams} from "react-router-dom";

export const CategoryPage = () => {
    const {id} = useParams();
    const returnString = (id === "1") ? "2D" : (id === "2") ? "3D" : "SFX";
    return (
        <div>Category chosen: {returnString} </div>
    )
}