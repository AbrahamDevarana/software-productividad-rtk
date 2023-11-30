
import { NavLink } from 'react-router-dom'
import { DatePicker, Image } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAreasThunk } from '@/redux/features/areas/areasThunks';
import { FaBuilding } from 'react-icons/fa';
import { getStorageUrl } from '@/helpers';

interface TacticaProps {
    handleBar: () => void;
}


export const Tactica: React.FC<TacticaProps> = ({handleBar}) => {

    const dispatch = useAppDispatch();
    const {areas} = useAppSelector(state => state.areas)

    useEffect(() => {
        dispatch(getAreasThunk({}))
    }, [])

    const whiteSvg = (url: string) => {
        const partes = url.split('.');
        const extension = partes.pop();
        const nuevoNombre = `${partes.join('.')}_white.${extension}`;
        return nuevoNombre;
    }

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
                                 {/* <Image src={getStorageUrl(area.perspectivas?.icono)} width={30} height={30} preview={false} /> */}
                                <span>{area.nombre}</span>
                            </div>
                        </NavLink>
                    ))
                }
            </div>
    </>
  )
}
