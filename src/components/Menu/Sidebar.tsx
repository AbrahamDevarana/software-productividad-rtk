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
import Avatar from "../ui/Avatar";

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
        getItem('Actividades', 'sub1', <FaTasks className={`${ active ? "justify-center text-2xl" : ""}`}/>, [
          getItem('Planeación', '/planeacion', <TbLetterP className="text-white"/>),
          getItem('Tareas', '/tareas', <TbLetterT className="text-white"/>),
          getItem('Eureka', '/eureka', <TbLetterE className="text-white"/>),
        ]),
        getItem('Proyectos', 'sub2', <FaProjectDiagram className={`${ active ? "justify-center" : ""}`}/>, [
          getItem('Proyecto', '/proyecto-1'),
          getItem('Proyecto', '/proyecto-2'),
        ]),
        getItem('','sub3', null, undefined, 'divider'),
        getItem('Somos DEVARANA', '/somos-devarana', <FaEarlybirds className={` text-2xl-forced ${ active ? "justify-center text-2xl " : ""}`}/>),
        getItem('Estrategía', 'sub5', <IoIosRocket className={`${ active ? "justify-center" : ""}`}/>, [
            // getItem('Option 5', '/'),
            // getItem('Option 6', '/'),
        ]),
        getItem('Objetivos', 'sub6', <BiTargetLock className={`${ active ? "justify-center" : ""}`}/>, [
            getItem('Profesionales', '/profesionales', <TbLetterP className="text-white"/>),
            getItem('Personales', '/personales', <TbLetterP className="text-white"/> ),
        ]),
        getItem('','sub7', null, undefined, 'divider'),
        getItem('Configuración', 'sub8', <BsGearFill className={`${ active ? "justify-center" : ""}`}/>, [
            getItem('Usuarios', '/usuarios', <FaUserFriends/>),
            // getItem('Option 6', '/usuarios'),
        ]),
      ]; 


  return (
    <aside className={`group transition-all duration-300 ease-in-out m-3 sm:left-0 -left-72 w-full fixed ${active? "w-[80px] sm:hover:w-[250px] fixed z-50 " : "w-[250px] left-0 z-50"}`}>
        <div className={`gradient-black rounded-ext p-5 flex flex-col sidebar-h transition-all duration-300 ease-in-out w-full overflow-auto`}>
            <a href="" className='text-center text-white'>Logo</a>
            <div className='divider w-full h-0.5'></div>
            
            <Link to={"/perfil"} className={`hover:text-white hover:bg-white hover:bg-opacity-50 ${url === '/perfil'? 'bg-white bg-opacity-50' : ''} rounded-ext text-center text-white flex align-middle items-center px-5 py-2 ${ active ? "justify-center px-0 group-hover:px-5" : "ml-1"}`}>
                <Avatar picture={userAuth? userAuth.picture : ''} className="w-[30px]" /> 
                    <span className={ `${ active ? "hidden" : ""} mx-auto group-hover:block` }> {`${userAuth? `${userAuth.nick_name  || userAuth.name + ' ' + userAuth.lastName}`  : ''}`} 
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
            />
        </div>
    </aside> 
  )
}


