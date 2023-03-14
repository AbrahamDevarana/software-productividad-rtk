import LayoutApp from '../components/layouts/LayoutPrivate';
import LayoutEmpty from '../components/layouts/LayoutEmpty';
import LayoutLogin from '../components/layouts/LayoutPublic'
import { LayoutLoginProps } from '../interfaces';
import { Areas } from '../pages/admin/Areas';
import Login from '../pages/Auth/Login'
import LoginError from '../pages/Auth/LoginError';
import LoginSuccess from '../pages/Auth/LoginSuccess';
import { Devarana } from '../pages/Devarana';
import Home from '../pages/Home';
import { Objetivos } from '../pages/Objetivos';
import Perfil from '../pages/Perfil';
import { ErrorPage } from '../pages/ErrorPage';
import { Provider } from '../pages/Auth/Provider';
import { EstrategíaHome } from '../pages/Estrategia';
import { Usuarios } from '../pages/admin/Usuarios';
import { Departamentos } from '../pages/admin/Departamentos/index';

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
        path: "/loginv2",
        layout: LayoutLogin,
        component: Provider,
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
    {
        path: "/perfil/:id",
        layout: LayoutApp,
        component: Perfil
    },
    {
        path: '/admin/areas',
        layout: LayoutApp,
        component: Areas
    },
    {
        path: '/admin/departamentos',
        layout: LayoutApp,
        component: Departamentos
    },
    {
        path: '/admin/usuarios',
        layout: LayoutApp,
        component: Usuarios
    },
    {
        path: '/somos-devarana',
        layout: LayoutApp,
        component: Devarana
    },
    {
        path: '/objetivos',
        layout: LayoutApp,
        component: Objetivos
    },
    {
        path: '/estrategia',
        layout: LayoutApp,
        component: EstrategíaHome
    },
    {
        path: '*',
        layout: LayoutApp,
        component: ErrorPage
    }
]


const routes = [...rutaPublica, ...rutaPrivada]

export default routes