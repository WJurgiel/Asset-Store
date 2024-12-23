import {NavLink} from "react-router-dom";

export const Header = () => {
    return(
        <div>
            <NavLink to={'/home'}>home</NavLink>
            <NavLink to={'/category'}>2D/3D/SFX</NavLink>
            <NavLink to={'/login'}>login</NavLink>
            <NavLink to={'/profile'}>profile</NavLink>
            <NavLink to={'/checkout'}>checkout</NavLink>
        </div>
    )
}