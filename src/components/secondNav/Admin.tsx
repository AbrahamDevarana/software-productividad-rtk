import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '../Icon'

interface AdminProps {
    handleBar: () => void;
}

export const Admin = ({handleBar}:AdminProps) => {
  return (
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
  )
}
