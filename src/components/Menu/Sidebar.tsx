import AvatarProfile from '../ui/Avatar'
import SvgIsotipo from '../svg/Isotipo';
import { NavLink} from 'react-router-dom';
import "@/assets/scss/menu.scss"
import { Icon } from '../Icon';
import { optionalContent } from '@/interfaces';

interface LayoutSidebarProps {
    setOptBarVisible: (value: boolean) => void;
    optBarVisible: boolean;
    setOptionalContent: (value: optionalContent) => void;
}

export const Sidebar = ({optBarVisible, setOptBarVisible, setOptionalContent}:LayoutSidebarProps) => {

    const handleOptBar = (opt:optionalContent) => {
        setOptionalContent(opt)
        setOptBarVisible(!optBarVisible)
    }

  return (
    <div className='h-screen'>
        <div className="w-[90px] h-screen bg-white p-2 shadow-lg dark:bg-dark-gradient">
            <div className="flex flex-col menuSidebar items-center h-full gap-y-1 menu_sidebar">
                <NavLink to={'/'} className={`link nav-link`}>
                    <SvgIsotipo className={`h-10 w-full block svg-icon brand`} />
                </NavLink>

                <div className='bg-gradient-to-r from-transparent dark:via-white via-devarana-midnight  to-transparent h-0.5 w-full rounded-full opacity-20' />

                <NavLink to={'/perfil'} className={`link profile nav-link text-center`}>
                    <AvatarProfile preview={false} className="h-5 w-5 mx-auto" />
                </NavLink>

                <div className='bg-gradient-to-r from-transparent dark:via-white via-devarana-midnight  to-transparent h-0.5 w-full rounded-full opacity-20' />
                <NavLink to={'/somos-devarana'} className={`link nav-link text-center`}>
                    {/* <Icon iconName="faDove" className="h-5 w-5 mx-auto text-2xl" /> */}
                    <SvgIsotipo className={`h-6 w-full block svg-icon`} />
                    <span className="text-xs text-center font-light block">Devarana</span>
                </NavLink>
                <NavLink to={'/estrategia'} className={`link nav-link text-center`}>
                    <Icon iconName='faRocket' className="h-5 w-5 mx-auto text-2xl" />
                    <span className="text-xs text-center font-light block">Estrategia</span>
                </NavLink>
                <div className={`nav-link cursor-pointer text-center`} onClick={() => handleOptBar('tactica')}>
                    <Icon iconName="faBrain" className="h-5 w-5 mx-auto text-2xl" />
                    <span className="text-xs text-center font-light block">Táctica</span>
                </div>
                <NavLink to={'/objetivos'} className={`link nav-link text-center`}>
                    <Icon iconName='faCrosshairs' className="h-5 w-5 mx-auto text-2xl" />
                    <span className="text-xs text-center font-light block">Objetivos</span>
                </NavLink>
                <NavLink to={'/proyectos'} className={`link nav-link text-center`}>
                    <Icon iconName="faPuzzlePiece" className="h-5 w-5 mx-auto text-2xl" />
                    <span className="text-xs text-center font-light block">Proyectos</span>
                </NavLink>
                <NavLink to={'/actividades'} className={`link nav-link text-center`}>
                    <Icon iconName="faSquareCheck" className="h-5 w-5 mx-auto text-2xl" />
                    <span className="text-xs text-center font-light block">Actividades</span>
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
                   
                    
                </div>

            </div>
        </div>
    </div>
  )
}
