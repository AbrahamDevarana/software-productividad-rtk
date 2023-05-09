import { NavLink } from 'react-router-dom'
import { FaBuilding, FaSitemap, FaUsers } from 'react-icons/fa';

interface AdminProps {
    handleBar: () => void;
}

export const Admin = ({handleBar}:AdminProps) => {
  return (
    <div className="flex flex-col">         
        <NavLink to={'/admin/areas'} onClick={handleBar}>
            <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                <FaBuilding/>
                <span>Áreas</span>
            </div>
        </NavLink>
        <NavLink to={'/admin/departamentos'} onClick={handleBar}>
            <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                <FaSitemap />
                <span>Departamentos</span>
            </div>
        </NavLink>
        <NavLink to={'/admin/usuarios'} onClick={handleBar}>
            <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                <FaUsers />
                <span>Usuarios</span>
            </div>
        </NavLink>
    </div>
  )
}
