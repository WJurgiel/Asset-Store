import {NavLink} from "react-router-dom";
import styles from "./AppHeader.module.css"

export const AppHeader = () => {
    return (
        <div className={styles.appHeader}>
            <NavLink to={'/home'}>home</NavLink>
            <NavLink to={'/category'}>2D/3D/SFX</NavLink>
            <NavLink to={'/login'}>login</NavLink>
            <NavLink to={'/profile'}>profile</NavLink>
            <NavLink to={'/checkout'}>checkout</NavLink>
        </div>
    )
}