import LayoutApp from '../components/layouts/LayoutApp';
import LayoutEmpty from '../components/layouts/LayoutEmpty';
import LayoutLogin from '../components/layouts/LayoutLogin'
import { LayoutLoginProps } from '../interfaces';
import Login from '../pages/Auth/Login'
import LoginError from '../pages/Auth/LoginError';
import LoginSuccess from '../pages/Auth/LoginSuccess';
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';

interface RouteProps {
    path: string;
    component: () => JSX.Element
    layout: ({ children }: LayoutLoginProps) => JSX.Element
}

const rutaPublica:RouteProps[] = [
    {
        path: "/login",
        layout: LayoutLogin,
        component: Login,
    },
    {
        path: "/success",
        layout: LayoutEmpty,
        component: LoginSuccess,
    },
    {
        path: "/error",
        layout: LayoutEmpty,
        component: LoginError,
    }
]

const  rutaPrivada:RouteProps[] = [
    {
        path: '/',
        layout: LayoutApp,
        component: Home,
    },
    {
        path: "/perfil",
        layout: LayoutApp,
        component: Perfil
    },
]


const routes = [...rutaPublica, ...rutaPrivada]

export default routes