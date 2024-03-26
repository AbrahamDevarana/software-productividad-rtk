import { DatePicker, Dropdown, Select, Space } from "antd";
import type { MenuProps } from 'antd';
import { LayoutNavbarProps } from "@/interfaces"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutThunk } from "@/redux/features/auth/authThunks";

import {FaSignOutAlt } from "react-icons/fa";
import MyBreadcrumb from "../ui/Breadcrumb";
import dayjs from "dayjs";
import { changeConfigThunk, useGetGlobalsConfigQuery } from "@/redux/features/global/globalThunk";
import { BsFillCalendarFill } from "react-icons/bs";
import { useEffect } from "react";
import { useGetUsuariosQuery } from "@/redux/features/usuarios/usuariosThunks";
import { Link } from "react-router-dom";
import { DefaultOptionType } from "antd/es/select";

import type {Dayjs} from 'dayjs';

export const Navbar = ({setSettingVisible, navbarClass}:LayoutNavbarProps) => {

	const { currentConfig: {quarter, year, currentDate} } = useAppSelector(state => state.global)
	const { data: usuarios, isLoading } = useGetUsuariosQuery({status: 'ACTIVO'})
	
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

	const handleChangeDate = (date: Dayjs, dateString: string | string[]) => {
		dispatch(changeConfigThunk({year: date.year(), quarter: date.quarter()}))
	}


	return (
		<div className="relative w-full">
			<div className={`h-16 px-5 rounded-ext mb-4   backdrop-blur-sm border-white border-opacity-25 fixed z-50 left-28 right-8 transition-all duration-200 ease-in-out ${navbarClass}`}>
				<div className="flex h-full items-center">
					<div className="text-devarana-midnight font-light">
						<MyBreadcrumb />
					</div>
					<div className="sm:ml-auto flex items-center gap-x-5">

						<Select
							options={usuarios?.map( (item, index) => (	
								{
									label: (
										<Link key={index} to={`/perfil/${item.slug}`}>
											<p className="text-devarana-graph">{item.nombre} {item.apellidoPaterno}</p>
										</Link>
									),
									value: item.id,
									dataName: `${item.nombre} ${item.apellidoPaterno}`
								}
							))}
							suffixIcon={false}
							size='small'
							showSearch
							placeholder='Buscar'
							loading={isLoading}
							style={{ width: 200 }}
							filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
						/>

						<DatePicker 
							onChange={handleChangeDate}
							value={ dayjs().quarter(quarter).year(year) } 
							format={'Q° [Trimestre] YYYY'} 
							picker='quarter' 
							clearIcon={false} 
							size='small' 
							style={{
								width: '160px',
							}}
							suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
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
								
								return false;
							}}
						/>
						
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
