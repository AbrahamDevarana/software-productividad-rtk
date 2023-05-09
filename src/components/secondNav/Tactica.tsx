
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

    const [date, setDate] = useState({
        quarter: dayjs().quarter(),
        year: new Date().getFullYear()
    });

    const onChange: DatePickerProps['onChange'] = (value, dateString) => {
        
        setDate({
            quarter: dayjs(value).quarter(),
            year: dayjs(value).year()
        })        

    };

    useEffect(() => {
        dispatch(getAreasThunk({}))
    }, [])

    const disabledDate = ( current: Dayjs ) => {
        return (
            current && (
            current.endOf('quarter') > dayjs().endOf('quarter') ||
            current.year() < 2023
            )
        );
    };

  return (
    <>
    <DatePicker onChange={onChange} picker="quarter" className='w-full mb-2' placeholder='Seleccionar Trimestre' 
        format={'Qo [Trimestre] YYYY'} defaultValue={dayjs()} clearIcon={false} disabledDate={disabledDate}
    />

    <div className="flex flex-col">         
        {
            areas && areas.map(area => (
                <NavLink to={`/tactica/${area.slug}`} onClick={handleBar} state={{
                    quarter: date.quarter,
                    year: date.year,
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
