import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Signup from "../views/Signup";
import About from "../views/About";

const routes = [
        {
                path: "/",
                name: "Home",
                component: Home,
        },
        {
                path: "/signup",
                name: "Signup",
                component: Signup,
        },
        {
                path: "/login",
                name: "Login",
                component: Login,
        },
        {
                path: "/about",
                name: "About",
                component: About,
        },
];

const router = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes,
});

export default router;
