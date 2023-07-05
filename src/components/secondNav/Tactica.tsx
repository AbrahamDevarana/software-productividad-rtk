
import { NavLink } from 'react-router-dom'
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAreasThunk } from '@/redux/features/admin/areas/areasThunks';
import { FaBuilding } from 'react-icons/fa';

interface TacticaProps {
    handleBar: () => void;
}


export const Tactica: React.FC<TacticaProps> = ({handleBar}) => {

    const dispatch = useAppDispatch();
    const {areas} = useAppSelector(state => state.areas)

    useEffect(() => {
        dispatch(getAreasThunk({}))
    }, [])


  return (
    <>

    <div className="flex flex-col">         
        {
            areas && areas.map(area => (
                <NavLink to={`/tactica/${area.slug}`} onClick={handleBar} state={{
                   areaId: area.id
                }} key={area.id}>
                    <div className="text-white p-2 nav-link rounded flex content-center items-center gap-2">
                        <FaBuilding />
                        <span>{area.nombre}</span>
                    </div>
                </NavLink>
            ))
        }
    </div>
    </>
  )
}
