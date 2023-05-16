import SvgIsotipo from '../svg/Isotipo';
import { NavLink} from 'react-router-dom';
import "@/assets/scss/menu.scss"
import { optionalContent } from '@/interfaces';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { FaBrain, FaCheckSquare, FaCog, FaComment, FaCrosshairs, FaPuzzlePiece, FaRocket, FaSquare } from 'react-icons/fa';
import { Avatar } from 'antd';

interface LayoutSidebarProps {
    setOptBarVisible: (value: boolean) => void;
    optBarVisible: boolean;
    setOptionalContent: (value: optionalContent) => void;
}

export const Sidebar = ({optBarVisible, setOptBarVisible, setOptionalContent}:LayoutSidebarProps) => {

    const { userAuth } = useAppSelector((state: RootState) => state.auth)

    const handleOptBar = (opt:optionalContent) => {
        setOptionalContent(opt)
        setOptBarVisible(!optBarVisible)
    }

  return (
    <div className='h-screen'>
        <div className="w-[90px] h-screen p-2 shadow-lg bg-dark-gradient">
            <div className="flex flex-col menuSidebar items-center h-full gap-y-1 menu_sidebar">
                <NavLink to={'/'} className={`link nav-link`}>
                    <SvgIsotipo className={`h-10 w-full block svg-icon brand`} />
                </NavLink>

                <div className='bg-gradient-to-r from-transparent via-white to-transparent h-0.5 w-full rounded-full opacity-20' />

                <NavLink to={'/perfil'} className={`link profile nav-link text-center`}>
                    <Avatar src={import.meta.env.VITE_STORAGE_URL + userAuth.foto} size={40} />
                </NavLink>

                <NavLink to={'/somos-devarana'} className={`link nav-link text-center`}>
                    {/* <Icon iconName="faDove" className="mx-auto text-xl" /> */}
                    <SvgIsotipo className={`h-6 w-full block svg-icon`} />
                    <span className="text-xs text-center font-light block">Devarana</span>
                </NavLink>
                <div className='bg-gradient-to-r from-transparent via-white  to-transparent h-0.5 w-full rounded-full opacity-20' />
                <NavLink to={'/estrategia'} className={`link nav-link text-center`}>
                    <FaRocket className="mx-auto text-xl" />
                    <span className="text-xs text-center font-light block">Estrategia</span>
                </NavLink>
                <div className={`nav-link cursor-pointer text-center`} onClick={() => handleOptBar('tactica')}>
                    <FaBrain  className="mx-auto text-xl" />
                    <span className="text-xs text-center font-light block">Táctica</span>
                </div>
                <NavLink to={'/objetivos'} className={`link nav-link text-center`}>
                    <FaCrosshairs className="mx-auto text-xl" />
                    <span className="text-xs text-center font-light block">Objetivos</span>
                </NavLink>
                <div className='bg-gradient-to-r from-transparent via-white to-transparent h-0.5 w-full rounded-full opacity-20' />
                <NavLink to={'/proyectos'} className={`link nav-link text-center`}>
                    <FaPuzzlePiece className="mx-auto text-xl" />
                    <span className="text-xs text-center font-light block">Proyectos</span>
                </NavLink>
                <NavLink to={'/actividades'} className={`link nav-link text-center`}>
                    <FaCheckSquare className="mx-auto text-xl" />
                    <span className="text-xs text-center font-light block">Actividades</span>
                </NavLink>
                {/* Chat button */}
                <div className='nav-link cursor-pointer text-center' onClick={() => handleOptBar('chat')}>
                    <FaComment className="mx-auto text-xl" />
                    <span className="text-xs text-center font-light block">Chat</span>
                </div>

                <div className="flex justify-end flex-col mt-auto gap-y-1 w-full">
                    <div onClick={() => handleOptBar('admin')} className={`link nav-link text-center cursor-pointer`}>
                        <FaCog className="mx-auto text-xl" />
                        <span className="text-xs text-center font-light block">Admin</span>
                    </div>
                   
                    
                </div>

            </div>
        </div>
    </div>
  )
}
