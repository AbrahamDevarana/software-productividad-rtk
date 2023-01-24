import AvatarProfile from '../ui/Avatar'
import { FaTasks, FaProjectDiagram, FaEarlybirds } from 'react-icons/fa';
import { IoIosRocket } from 'react-icons/io';
import { BiTargetLock } from 'react-icons/bi';
import { BsGearFill } from 'react-icons/bs';
import SvgIsotipo from '../svg/Isotipo';
import { Link, NavLink} from 'react-router-dom';

import "../../assets/scss/menu.scss"

export const NewSidebar = () => {
  return (
    <div className='h-screen'>
        <div className="w-[90px] h-screen bg-white p-2 gradient-black">
            <div className="flex flex-col menuSidebar items-center h-full gap-y-1">
                <NavLink to={'/'} className={`link hover:bg-white hover:bg-opacity-50 rounded-xl p-2 w-full text-center`}>
                    <SvgIsotipo className={`h-10 mx-auto fill-white`} />
                </NavLink>

                <div className='divider w-full h-0.5' />

                <NavLink to={'/actividades'} className={`link hover:bg-white hover:bg-opacity-50 rounded-xl p-2 w-full text-center`}>
                    <FaTasks className="h-5 w-5 mx-auto" />
                    <span className="text-xs text-center font-light">Actividades</span>
                </NavLink>
                <NavLink to={'/proyectos'} className={`link hover:bg-white hover:bg-opacity-50 rounded-xl p-2 w-full text-center`}>
                    <FaProjectDiagram className="h-5 w-5 mx-auto" />
                    <span className="text-xs text-center font-light">Proyectos</span>
                </NavLink>
                <NavLink to={'/somos-devarana'} className={`link hover:bg-white hover:bg-opacity-50 rounded-xl p-2 w-full text-center`}>
                    <FaEarlybirds className="h-5 w-5 mx-auto" />
                    <span className="text-xs text-center font-light">Devarana</span>
                </NavLink>
                <NavLink to={'/estrategia'} className={`link hover:bg-white hover:bg-opacity-50 rounded-xl p-2 w-full text-center`}>
                    <IoIosRocket className="h-5 w-5 mx-auto" />
                    <span className="text-xs text-center font-light">Estrategia</span>
                </NavLink>
                <NavLink to={'/objetivos'} className={`link hover:bg-white hover:bg-opacity-50 rounded-xl p-2 w-full text-center`}>
                    <BiTargetLock className="h-5 w-5 mx-auto" />
                    <span className="text-xs text-center font-light">Objetivos</span>
                </NavLink>

                <div className="flex justify-end flex-col mt-auto gap-y-1">
                    <NavLink to={'/admin'} className={`link hover:bg-white hover:bg-opacity-50 rounded-xl p-2 w-full text-center`}>
                        <BsGearFill className="h-5 w-5 mx-auto" />
                        <span className="text-xs text-center font-light">Configuración</span>
                    </NavLink>
                    <NavLink to={'/perfil'} className={`link profile hover:bg-white hover:bg-opacity-50 rounded-xl p-2 w-full text-center`}>
                        <AvatarProfile className="h-5 w-5 mx-auto" />
                    </NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}
