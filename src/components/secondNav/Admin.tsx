import { NavLink } from 'react-router-dom'
import { FaBuilding, FaSitemap, FaUserShield, FaUsers, FaUserLock, FaCogs} from 'react-icons/fa';
import { hasGroupPermission, hasPermission } from '@/helpers/hasPermission';
import { useAppSelector } from '@/redux/hooks';

interface AdminProps {
    handleBar: () => void;
}

export const Admin = ({handleBar}:AdminProps) => {

    const { permisos } = useAppSelector(state => state.auth)

  return (
    <div className="flex flex-col">         
       { hasGroupPermission(['crear areas', 'editar areas', 'eliminar areas'], permisos) && 
            <NavLink to={'/admin/areas'} onClick={handleBar}>
                <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                    <FaBuilding/>
                    <span>Áreas</span>
                </div>
            </NavLink>
        }
        { hasGroupPermission(['crear departamentos', 'editar departamentos', 'eliminar departamentos'], permisos) && 
        <NavLink to={'/admin/departamentos'} onClick={handleBar}>
            <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                <FaSitemap />
                <span>Departamentos</span>
            </div>
        </NavLink>
        }
        { hasGroupPermission(['crear usuarios', 'editar usuarios', 'eliminar usuarios'], permisos) && 
        <NavLink to={'/admin/usuarios'} onClick={handleBar}>
            <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                <FaUsers />
                <span>Usuarios</span>
            </div>
        </NavLink>
        }
        { hasGroupPermission(['crear usuarios', 'editar usuarios', 'eliminar usuarios'], permisos) && 
        <NavLink to={'/admin/gestion'} onClick={handleBar}>
            <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                <FaCogs />
                <span>Gestion</span>
            </div>
        </NavLink>
        }
        { hasGroupPermission(['crear usuarios', 'editar usuarios', 'eliminar usuarios'], permisos) && 
        <NavLink to={'/admin/roles'} onClick={handleBar}>
            <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                <FaUserShield />
                <span>Roles</span>
            </div>
        </NavLink>
        }
        { hasGroupPermission(['crear usuarios', 'editar usuarios', 'eliminar usuarios'], permisos) && 
        <NavLink to={'/admin/permisos'} onClick={handleBar}>
            <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                <FaUserLock />
                <span>Permisos</span>
            </div>
        </NavLink>
        }
    </div>
  )
}
