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
import { EstrategiaHome } from '@/pages/Estrategia';
import { Usuarios } from '@/pages/admin/Usuarios';
import { Departamentos } from '@/pages/admin/Departamentos';
import { ObjEstrategico } from '@/pages/Estrategia/ObjEstrategico';
import { Tactico } from '@/pages/Tactico';
import { Proyectos } from '@/pages/Proyectos';
import { ProyectoView } from '@/pages/Proyectos/ProyectoView';
import { OperativoView } from '@/pages/Operativos/OperativoView';
import { Actividades } from '@/pages/Actividades';
import { Comite } from '@/pages/Comite';


interface Props {
    path: string;
    layout: React.FC<LayoutLoginProps>;
    component: React.FC;
}

interface PrivateRouteProps extends Props {
    title: string;
}




export const rutaPublica:Props[] = [
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

export const  rutaPrivada:PrivateRouteProps[] = [
    {
        title: "Home",
        path: '/',
        layout: LayoutApp,
        component: Home,
    },
    {
        title: "Perfil",
        path: "/perfil",
        layout: LayoutApp,
        component: Perfil
    },
    {
        title: "Perfil de Usuario",
        path: "/perfil/:id",
        layout: LayoutApp,
        component: Perfil
    },
    {
        title: "Areas",
        path: '/admin/areas',
        layout: LayoutApp,
        component: Areas
    },
    {
        title: "Departamentos",
        path: '/admin/departamentos',
        layout: LayoutApp,
        component: Departamentos
    },
    {
        title: "Usuarios",
        path: '/admin/usuarios',
        layout: LayoutApp,
        component: Usuarios
    },
    {
        title: "Devarana",
        path: '/somos-devarana',
        layout: LayoutApp,
        component: Devarana
    },
    {
        title: "Objetivos Operativos",
        path: '/objetivos',
        layout: LayoutApp,
        component: Objetivos
    },
    {
        title: "Objetivos Operativos",
        path: '/objetivos/:id',
        layout: LayoutApp,
        component: Objetivos
    },
    {
        title: "Objetivo Operativo",
        path: '/objetivo/:id',
        layout: LayoutApp,
        component: OperativoView
    },
    {
        title: "Estrategia",
        path: '/estrategia',
        layout: LayoutApp,
        component: EstrategiaHome
    },
    {
        title: "Objetivo Estrategico",
        path: '/estrategia/:id',
        layout: LayoutApp,
        component: ObjEstrategico
    },
    {
        title: "Tactico",
        path: '/tactica/:slug',
        layout: LayoutApp,
        component: Tactico
    },
    {
        title: "Proyectos",
        path: '/proyectos',
        layout: LayoutApp,
        component: Proyectos
    },
    {
        title: "Actividades",
        path: '/actividades',
        layout: LayoutApp,
        component: Actividades
    },
    {
        title: "Comité",
        path: '/comite',
        layout: LayoutApp,
        component: Comite
    },
    {
        title: "Proyectos",
        path: '/proyectos/:id',
        layout: LayoutApp,
        component: ProyectoView
    },
    {
        title: "Error",
        path: '*',
        layout: LayoutApp,
        component: ErrorPage
    }
]



const routes = [...rutaPublica, ...rutaPrivada]

export default routes