import {Outlet} from "react-router-dom";
import {AppHeader} from "./AppHeader.tsx";
import styles from "./Layout.module.css"

export const Layout = () => {
    return (<div className={styles.app}>
        <AppHeader/>
        <Outlet/>
    </div>)
}