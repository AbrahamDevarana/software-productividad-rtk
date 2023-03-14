import { NavLink } from 'react-router-dom';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Icon } from "../Icon";

interface OptBarProps{
    optBarVisible: boolean;
    setOptBarVisible: (optBarVisible: boolean) => void;
}



export const OptBar = ({optBarVisible, setOptBarVisible}:OptBarProps) => {

    const handleBar = () => {
        setOptBarVisible(!optBarVisible);
    }

    const handleSelectIcon = (icon: IconDefinition) => {
        console.log(icon.iconName);
    }

    return (
        <>
            <div className={`${ optBarVisible ? 'w-full z-[1000]' : 'w-0 opacity-0 -z-50' } transition-all duration-500 ease-linear`} style={{  maxWidth: '250px', }}>
                <div className={`dark:bg-dark-gradient bg-white  w-full h-full menu_sidebar relative p-5`} >
                    <button className="absolute right-0 top-5 justify-center flex py-5 rounded-l-lg bg-devarana-blue dark:bg-devarana-graph"> 
                        <Icon iconName="faCaretLeft" className="text-white text-xl pl-1" onClick={ handleBar} />
                    </button>
                    <div className="flex flex-col">         
                        <NavLink to={'/admin/areas'} onClick={handleBar}>
                            <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                                <Icon iconName="faBuilding" />
                                <span>Áreas</span>
                            </div>
                        </NavLink>
                        <NavLink to={'/admin/departamentos'} onClick={handleBar}>
                            <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                                <Icon iconName="faSitemap" />
                                <span>Departamentos</span>
                            </div>
                        </NavLink>
                        <NavLink to={'/admin/usuarios'} onClick={handleBar}>
                            <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                                <Icon iconName="faUsers" />
                                <span>Usuarios</span>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
