import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../components/Layout.tsx";
import {MainPage} from "./shop/MainPage.tsx";
import {CategoryPage} from "./shop/CategoryPage.tsx";
import {ProductPage} from "./shop/ProductPage.tsx";
import {LoginPage} from "./user/LoginPage.tsx";
import {ProfilePage} from "./user/ProfilePage.tsx";
import {CheckoutPage} from "./user/CheckoutPage.tsx";
import {ErrorPage} from "./error/ErrorPage.tsx";
import {RegisterPage} from "./user/RegisterPage.tsx";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace/>,
            },
            {
                path: "/home",
                element: <MainPage></MainPage>
            },
            {
                path: "/category/:id",
                element: <CategoryPage></CategoryPage>
            },
            {
                path: "/product/:id",
                element: <ProductPage></ProductPage>
            },
            {
                path: "/login",
                element: <LoginPage></LoginPage>
            },
            {
                path: "/register",
                element: <RegisterPage></RegisterPage>
            },
            {
                path: "/profile",
                element: <ProfilePage></ProfilePage>
            },
            {
                path: "/checkout",
                element: <CheckoutPage></CheckoutPage>
            },
            {
                path: "*",
                element: <ErrorPage></ErrorPage>
            },

        ]
    }
]

export const Routing = () => {
    return useRoutes(routes);
}