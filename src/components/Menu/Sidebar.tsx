import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutSidebar } from "../../interfaces"
import "../../assets/scss/menu.scss"
import { Menu, MenuProps, MenuTheme } from "antd";

// Iconos
import {IoIosRocket} from 'react-icons/io'
import { FaProjectDiagram, FaTasks, FaEarlybirds, FaUserFriends } from 'react-icons/fa'
import { BiTargetLock } from 'react-icons/bi'
import { BsGearFill } from 'react-icons/bs'
import { TbLetterP, TbLetterT, TbLetterE } from "react-icons/tb";
import AvatarProfile from "../ui/Avatar";
import SvgLogo from "../svg/Logo";
import SvgIsotipo from "../svg/Isotipo";

type MenuItem = Required<MenuProps>['items'][number];


export const Sidebar = ({active}:LayoutSidebar) => {



    const location = useLocation() 

    
    const url = location.pathname
    
    const navigate = useNavigate()
    const userAuth = useAppSelector( state => state.auth.user )


    function getItem(
        label: React.ReactNode,
        key?: React.Key | null,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: string ): MenuItem {
        return {
          key,
          icon,
          children,
          label,
          type,
        } as MenuItem;
    }

    const [openKeys, setOpenKeys] = useState(['sub1']);
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6' ,'sub7'];
    const onOpenChange = (keys:any) => {
        const latestOpenKey = keys.find((key:any) => openKeys.indexOf(key) === -1);

        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
        } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const items:MenuProps['items'] = [
        getItem('Actividades', 'sub1', <FaTasks className={``}/>, [
          getItem('Planeación', '/planeacion', <TbLetterP className="text-white"/>),
          getItem('Tareas', '/tareas', <TbLetterT className="text-white"/>),
          getItem('Eureka', '/eureka', <TbLetterE className="text-white"/>),
        ]),
        getItem('Proyectos', 'sub2', <FaProjectDiagram className={``}/>, [
          getItem('Proyecto', '/proyecto-1' , ),
          getItem('Proyecto', '/proyecto-2'),
        ]),
        getItem('','sub3', null, undefined, 'divider'),
        getItem('Somos DEVARANA', '/somos-devarana', <FaEarlybirds className={`text-2xl-forced`}/>),
        getItem('Estrategía', 'sub5', <IoIosRocket className={``}/>, [
        ]),
        getItem('Objetivos', 'sub6', <BiTargetLock className={``}/>, [
            getItem('Profesionales', '/profesionales', <TbLetterP className="text-white"/>),
            getItem('Personales', '/objetivos-personales', <TbLetterP className="text-white"/> ),
        ]),
        getItem('','sub7', null, undefined, 'divider'),
        getItem('Configuración', 'sub8', <BsGearFill className={``}/>, [
            getItem('Usuarios', '/admin', <FaUserFriends/>),
        ]),
      ]; 


  return (
    <aside className={`group transition-all duration-300 ease-in-out m-3 sm:left-0 -left-72 w-full fixed ${active? "w-[80px] fixed z-50 " : "w-[250px] left-0 z-50"}`}>
        <div className={`gradient-black rounded-ext flex flex-col sidebar-h transition-all duration-300 ease-in-out w-full overflow-y-auto overflow-x-hidden ${active ? 'p-3 content-center items-center' : 'p-5'}`}>
            <a href="" className='text-center text-white'>
                <SvgIsotipo className={`fill-white h-10 ${active ? 'block' : 'hidden' }`} />
                <SvgLogo className={`fill-white ${active ? 'hidden' : 'block' } `} /> 
            </a>
            <div className='divider w-full h-0.5'></div>
            
            <Link to={"/perfil"} className={`hover:text-white hover:bg-white hover:bg-opacity-50 ${url === '/perfil'? 'bg-white bg-opacity-50' : ''} rounded-ext text-center text-white flex align-middle items-center px-2 py-2 ${ active ? "px-1" : ""}`}>
                <AvatarProfile picture={userAuth? userAuth.picture : ''}  className="my-auto" /> 
                    <span className={ `${ active ? "hidden" : ""} mx-auto px-1` }> {`${userAuth? `${userAuth.nick_name  || userAuth.name + ' ' + userAuth.lastName}`  : ''}`} 
                </span>
            </Link>
            <div className='divider w-full h-0.5'></div>
            <Menu
                mode="inline"
                openKeys={openKeys}               
                onOpenChange={onOpenChange}
                onClick={ (item) => navigate(item.key)}
                items={items}
                className={`text-white bg-transparent ${ active ? "menu-opt" : ""}`}
                defaultSelectedKeys={[`${url}`]}
                activeKey={url}
            />
        </div>
    </aside> 
  )
}


