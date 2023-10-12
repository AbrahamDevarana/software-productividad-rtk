import { getColor } from '@/helpers'
import { UsuarioGestion } from '@/interfaces'
import { obtenerUsuariosThunk } from '@/redux/features/gestion/gestionThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { statusTypes } from '@/types'
import { Segmented, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect } from 'react'

export const Gestion = () => {

	const { currentConfig: { quarter, year }} = useAppSelector(state => state.global)
	const { usuarios, isLoadingUsuarios } = useAppSelector(state => state.gestion)

	const dispatch = useAppDispatch()


	useEffect(() => {
		dispatch(obtenerUsuariosThunk({ quarter, year}))
	}, [year, quarter])
	

	const options = [
		{
			value: 'usuarios',
			label: 'Usuarios'
		}
	]

	console.log(usuarios);
	

	const columns: ColumnsType<UsuarioGestion> = [
		{
			title: () => ( <p className='tableTitlePrincipal'>Nombre</p>),
			key: 'name',
			render: (text, record) => (
				<p className='text-devarana-graph'>
					{record.nombre} {record.apellidoPaterno}  {record.apellidoMaterno} 
				</p>
			)
		},
		{
			title: () => ( <p className='tableTitle text-right'> Resultado Objetivos </p>),
			key: 'resultadoObjetivos',
			render: (text, record) => (
				<p className='text-default text-right'> {record.rendimiento[0].resultadoObjetivos.toFixed(2)} </p>
			)
		},
		{
			title: () => ( <p className='tableTitle text-right'> Resultado Competencias </p>),
			key: 'resultadoCompetencias',
			render: (text, record) => (
				<p className='text-default text-right'> {record.rendimiento[0].resultadoCompetencias.toFixed(2)} </p>
			)
		},
		{
			title: () => ( <p className='tableTitle text-right'> Resultado Final </p>),
			key: 'resultadoFinal',
			render: (text, record) => (
				<p className='text-default text-right'> {record.rendimiento[0].resultadoFinal.toFixed(2)} </p>
			)
		},
		{
			title: () => ( <p className='tableTitle text-right'> Bono Obtenido </p>),
			key: 'bonoObtenido',
			render: (text, record) => (
				<p className='text-default text-right'> {record.rendimiento[0].resultadoFinal} </p>
			)
		},
		{
			title: () => ( <p className='tableTitle text-right'> Estatus </p>),
			key: 'status',
			render: (text, record) => (
				<p className='text-default text-right' style={{
					color: getColor(record.rendimiento[0].status).color
				}}> 
					 {/* {statusTypes[record.rendimiento[0].status]} */}
					{ record.rendimiento[0].status }
				</p>
			)

		}
	]


	return (

		<>
		<Segmented
			options={options}
			onChange={(e) => console.log(e)}
			defaultValue='usuarios'
			
		/>
		<Table
			rowClassName={() => 'cursor-pointer hover:bg-gray-50 transition duration-200'}
			rowKey={(record) => record.id}
			loading={isLoadingUsuarios}
			columns={columns}
			dataSource={usuarios}
		>

		</Table>
		</>
	)
}
