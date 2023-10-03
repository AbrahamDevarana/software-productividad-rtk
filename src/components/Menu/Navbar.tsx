import { DatePicker, Dropdown, Space } from "antd";
import type { MenuProps } from 'antd';
import { LayoutNavbarProps } from "@/interfaces"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutThunk } from "@/redux/features/auth/authThunks";

import {FaSignOutAlt } from "react-icons/fa";
import MyBreadcrumb from "../ui/Breadcrumb";
import dayjs from "dayjs";
import { changeConfigThunk } from "@/redux/features/global/globalThunk";

export const Navbar = ({setSettingVisible, navbarClass}:LayoutNavbarProps) => {

    const { userAuth } = useAppSelector(state => state.auth)
	const { currentConfig: {quarter, year, currentDate}, periodControls: {prePeriodDefinitionDays} } = useAppSelector(state => state.global)

    const dispatch = useAppDispatch()

    const menu: MenuProps['items'] = [
            {
              key: '1',
              label: (
                <button onClick={() => dispatch(logoutThunk())} className="text-devarana-dark-graph">
					Cerrar sesión
                </button>
              ),
            },
	]

    const notificaciones: MenuProps['items'] = [
            {
              key: '1',
              label: (
                <span>
                  Se te ha designado una nueva <a className='font-bold'>tarea</a>
                </span>
              ),
            },
            {
              key: '2',
              label: (
                <span>
                  Tu <a className='font-bold'> tarea </a> esta por vencer
                </span>
              ),
            },
            {
              key: '3',
              label: (
                <span>
                    <a className='font-bold'>Fátima Ortiz</a> te ha asignado nueva <a className='font-bold'>tarea</a>
                </span>
              ),
            },
            {
              key: '4',
              label: (
                <span>
                  Se te ha designado una nueva<a className='font-bold'>tarea</a>
                </span>
              ),
            },
	]

    const showDrawer = () => {
        setSettingVisible(true);
    };

	const handleChangeDate = (date: any, dateString: string) => {
		dispatch(changeConfigThunk({year: date.year(), quarter: date.quarter()}))
	}

	// obtener el path
	// si la currentRoute incluye /objetivos, entonces retornar false 
	// si la currentRoute incluye = /estrategia, entonces retornar true

	const isGlobal = () => {
		const currentRoute = window.location.pathname;

		const urls = ['/perfil', '/objetivos'];

		if(urls.includes(currentRoute)) {
			return false;
		} else {
			return true;
		}
		
	}



	return (
		// glassmorphism
		<div className="relative w-full">
			<div className={`h-16 px-5 rounded-ext mb-4   backdrop-blur-sm border-white border-opacity-25 fixed z-50 left-28 right-8 transition-all duration-200 ease-in-out ${navbarClass}`}>
				<div className="flex h-full items-center">
					<div className="text-devarana-midnight font-light">
						<MyBreadcrumb />
					</div>
					<div className="sm:ml-auto flex items-center gap-x-5">

						{
							isGlobal() ? (
								<DatePicker
									picker={ isGlobal() ? 'year' : 'quarter' }
									value={ dayjs().quarter(quarter).year(year) }
									onChange={handleChangeDate}
									disabledDate={(current) => {
										const year = dayjs(currentDate).year();

										if(current < dayjs(currentDate)){
											// mostrar todos los trimestres hasta el 2023
											return current && current.year() < year;
										}
										
										// Mostrar el próximo trimestre si está dentro de prePeriodDefinitionDays días
										if(current >= dayjs(currentDate).add(prePeriodDefinitionDays, 'day')){
											return current && current.year() > year;
										}
										
										return false;
									}}
									clearIcon={false} 
									size='small' 
									style={{
										width: '75px',
									}}
								
							/> ) 
							:  ( 
								<DatePicker 
									onChange={handleChangeDate} 
									value={ dayjs().quarter(quarter).year(year) } 
									format={'[Q]Q YYYY'} 
									picker='quarter' 
									clearIcon={false} 
									size='small' 
									style={{
										width: '100px',
									}}
									disabledDate = { current => { 

										// Obtener el segundo quarter del 2023
										const secondQuarter = dayjs().quarter(3).year(2023);

										// SI la fecha actual es mayor o igual al segundo quarter del 2023, entonces no mostrar el picker
										if(current < secondQuarter){
											return true;
										}

										// Obtener el quarter de currentDate
										const year = dayjs(currentDate).year();

										if(current < dayjs(currentDate)){
											return current && current.year() < 2023;
										}
										if(current >= dayjs(currentDate).add(prePeriodDefinitionDays, 'day')){
											return current && current.year() > year;
										}
										
										return false;
									}}
								/>
							)
						}
						
						<Dropdown menu={{items:menu}} trigger={['click']}>
							<a onClick={(e) => e.preventDefault()} className="items-center flex">
								<Space>
									<FaSignOutAlt className='text-xl font-light text-devarana-graph cursor-pointer'/>
								</Space>
							</a>
						</Dropdown>
					</div>
				</div>
			</div>
		</div>
		
	)
}
