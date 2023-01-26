import LayoutApp from '../components/layouts/LayoutPrivate';
import LayoutEmpty from '../components/layouts/LayoutEmpty';
import LayoutLogin from '../components/layouts/LayoutPublic'
import { LayoutLoginProps } from '../interfaces';
import { Areas } from '../pages/admin/Areas';
import { Departamentos } from '../pages/admin/Departamentos';
import { Puestos } from '../pages/admin/Puestos';
import { Admin } from '../pages/admin';
import Login from '../pages/Auth/Login'
import LoginError from '../pages/Auth/LoginError';
import LoginSuccess from '../pages/Auth/LoginSuccess';
import { Devarana } from '../pages/Devarana';
import Home from '../pages/Home';
import { Objetivos } from '../pages/Objetivos';
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
    {
        path: "/perfil/:id",
        layout: LayoutApp,
        component: Perfil
    },
    {
        path: '/admin/',
        layout: LayoutApp,
        component: Admin
    },
    {
        path: '/admin/departamentos',
        layout: LayoutApp,
        component: Departamentos
    },
    {
        path: '/admin/areas',
        layout: LayoutApp,
        component: Areas
    },
    {
        path: '/admin/puestos',
        layout: LayoutApp,
        component: Puestos
    },
    {
        path: '/somos-devarana',
        layout: LayoutApp,
        component: Devarana
    },
    {
        path: '/objetivos-personales',
        layout: LayoutApp,
        component: Objetivos
    }
]


const routes = [...rutaPublica, ...rutaPrivada]

export default routes