import AvatarProfile from '../ui/Avatar'
import { FaTasks, FaProjectDiagram, FaEarlybirds } from 'react-icons/fa';
import { IoIosRocket } from 'react-icons/io';
import { BiChat, BiTargetLock } from 'react-icons/bi';
import { BsGearFill } from 'react-icons/bs';
import SvgIsotipo from '../svg/Isotipo';
import { Link, NavLink} from 'react-router-dom';

import "../../assets/scss/menu.scss"
import { Icon } from '../Icon';


interface LayoutSidebarProps {
    setOptBarVisible: (value: boolean) => void;
    optBarVisible: boolean;
}

export const Sidebar = ({optBarVisible, setOptBarVisible}:LayoutSidebarProps) => {

    const handleOptBar = (opt = 'admin') => {
        setOptBarVisible(!optBarVisible)
    }

  return (
    <div className='h-screen'>
        <div className="w-[90px] h-screen bg-white p-2 shadow-lg dark:bg-dark-gradient">
            <div className="flex flex-col menuSidebar items-center h-full gap-y-1 menu_sidebar">
                <NavLink to={'/'} className={`link nav-link`}>
                    <SvgIsotipo className={`h-10 mx-auto svg-icon`} />
                </NavLink>

                <div className='divider w-full h-0.5' />

                <NavLink to={'/actividades'} className={`link nav-link text-center`}>
                    <Icon iconName="faTasks" className="h-5 w-5 mx-auto text-2xl" />
                    <span className="text-xs text-center font-light block">Actividades</span>
                </NavLink>
                <NavLink to={'/proyectos'} className={`link nav-link text-center`}>
                    <Icon iconName="faProjectDiagram" className="h-5 w-5 mx-auto text-2xl" />
                    <span className="text-xs text-center font-light block">Proyectos</span>
                </NavLink>
                <NavLink to={'/somos-devarana'} className={`link nav-link text-center`}>
                    <Icon iconName="faDove" className="h-5 w-5 mx-auto text-2xl" />
                    <span className="text-xs text-center font-light block">Devarana</span>
                </NavLink>
                <NavLink to={'/estrategia'} className={`link nav-link text-center`}>
                    <Icon iconName='faRocket' className="h-5 w-5 mx-auto text-2xl" />
                    <span className="text-xs text-center font-light block">Estrategia</span>
                </NavLink>
                <NavLink to={'/objetivos'} className={`link nav-link text-center`}>
                    <Icon iconName='faCrosshairs' className="h-5 w-5 mx-auto text-2xl" />
                    <span className="text-xs text-center font-light block">Objetivos</span>
                </NavLink>
                {/* Chat button */}
                <div className='nav-link cursor-pointer text-center' onClick={() => handleOptBar('chat')}>
                    <Icon iconName='faComment' className="h-5 w-5 mx-auto text-2xl" />
                    <span className="text-xs text-center font-light block">Chat</span>
                </div>

                <div className="flex justify-end flex-col mt-auto gap-y-1 w-full">
                    <div onClick={() => handleOptBar('admin')} className={`link nav-link text-center cursor-pointer`}>
                        <Icon iconName='faGear' className="h-5 w-5 mx-auto text-2xl" />
                        <span className="text-xs text-center font-light block">Admin</span>
                    </div>
                    <NavLink to={'/perfil'} className={`link profile nav-link text-center`}>
                        <AvatarProfile preview={false} className="h-5 w-5 mx-auto" />
                    </NavLink>
                    
                </div>

            </div>
        </div>
    </div>
  )
}
