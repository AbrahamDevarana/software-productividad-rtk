
import { NavLink } from 'react-router-dom'
import { Icon } from '../Icon'

interface TacticaProps {
    handleBar: () => void;
}

export const Tactica = ({handleBar}:TacticaProps) => {
  return (
    <div className="flex flex-col">         
        <NavLink to={'/tactica/finanzas'} onClick={handleBar}>
            <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                <Icon iconName="faBuilding" />
                <span>Finanzas</span>
            </div>
        </NavLink>
        <NavLink to={'/tactica/comercial'} onClick={handleBar}>
            <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                <Icon iconName="faDiagramNext" />
                <span>Comercial</span>
            </div>
        </NavLink>
        <NavLink to={'/tactica/operaciones'} onClick={handleBar}>
            <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                <Icon iconName="faSuitcase" />
                <span>Operaciones</span>
            </div>
        </NavLink>
        <NavLink to={'/tactica/staff'} onClick={handleBar}>
            <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                <Icon iconName="faPeopleGroup" />
                <span>Staff</span>
            </div>
        </NavLink>
        <NavLink to={'/tactica/nuevos-proyectos'} onClick={handleBar}>
            <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                <Icon iconName="faNewspaper" />
                <span>Nuevos Proyectos</span>
            </div>
        </NavLink>
       
    </div>
  )
}
