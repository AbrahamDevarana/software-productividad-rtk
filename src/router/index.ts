import LayoutApp from '@/components/layouts/LayoutPrivate';
import LayoutEmpty from '@/components/layouts/LayoutEmpty';
import LayoutLogin from '@/components/layouts/LayoutPublic'
import { LayoutLoginProps } from '@/interfaces';
import { Areas } from '@/pages/admin/Areas';
import Login from '@/pages/Auth/Login'
import LoginError from '@/pages/Auth/LoginError';
import LoginSuccess from '@/pages/Auth/LoginSuccess';
import { Devarana } from '@/pages/Devarana';
import Home from '@/pages/Home';
import { Objetivos } from '@/pages/Operativos';
import Perfil from '@/pages/Perfil';
import { ErrorPage } from '@/pages/ErrorPage';
import { EstrategíaHome } from '@/pages/Estrategia';
import { Usuarios } from '@/pages/admin/Usuarios';
import { Departamentos } from '@/pages/admin/Departamentos';
import { ObjEstrategico } from '@/pages/Estrategia/ObjEstrategico';
import { Tactico } from '@/pages/Tactico';
import { Proyectos } from '@/pages/Proyectos';
import { ProyectoView } from '@/pages/Proyectos/ProyectoView';


interface RouteProps {
    path: string;
    layout: React.FC<LayoutLoginProps>;
    component: React.FC;
    name?: string;
}

export const rutaPublica:RouteProps[] = [
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

export const  rutaPrivada:RouteProps[] = [
    {
        name: "Home",
        path: '/',
        layout: LayoutApp,
        component: Home,
    },
    {
        name: "Perfil",
        path: "/perfil",
        layout: LayoutApp,
        component: Perfil
    },
    {
        name: "Perfil de Usuario",
        path: "/perfil/:id",
        layout: LayoutApp,
        component: Perfil
    },
    {
        name: "Areas",
        path: '/admin/areas',
        layout: LayoutApp,
        component: Areas
    },
    {
        name: "Departamentos",
        path: '/admin/departamentos',
        layout: LayoutApp,
        component: Departamentos
    },
    {
        name: "Usuarios",
        path: '/admin/usuarios',
        layout: LayoutApp,
        component: Usuarios
    },
    {
        name: "Devarana",
        path: '/somos-devarana',
        layout: LayoutApp,
        component: Devarana
    },
    {
        name: "Objetivos",
        path: '/objetivos',
        layout: LayoutApp,
        component: Objetivos
    },
    {
        name: "Estrategia",
        path: '/estrategia',
        layout: LayoutApp,
        component: EstrategíaHome
    },
    {
        name: "Objetivo Estrategico",
        path: '/estrategia/:id',
        layout: LayoutApp,
        component: ObjEstrategico
    },
    {
        name: "Tactico",
        path: '/tactica/:slug',
        layout: LayoutApp,
        component: Tactico
    },
    {
        name: "Proyectos",
        path: '/proyectos',
        layout: LayoutApp,
        component: Proyectos
    },
    {
        name: "Proyectos",
        path: '/proyectos/:id',
        layout: LayoutApp,
        component: ProyectoView
    },
    {
        name: "Error",
        path: '*',
        layout: LayoutApp,
        component: ErrorPage
    }
]



const routes = [...rutaPublica, ...rutaPrivada]

export default routes