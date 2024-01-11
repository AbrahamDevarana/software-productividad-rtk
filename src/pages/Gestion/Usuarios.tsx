import { Input, Modal, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui'
import { Administracion } from '../../components/operativo'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { SinglePerfilProps, UsuarioGestion } from '@/interfaces'
import { ColumnsType } from 'antd/es/table'
import { useDebounce } from '@/hooks/useDebouce'
import { generarReporteRendimientoThunk, obtenerUsuariosThunk } from '@/redux/features/gestion/gestionThunk'
import { FaEye } from 'react-icons/fa'
import { getColor } from '@/helpers'

export const Usuarios = () => {

    const [search, setSearch] = useState('')
	const [status, setStatus] = useState('')
    const { usuarios, isLoadingUsuarios, isGeneratingReport } = useAppSelector(state => state.gestion)
    const { currentConfig: { quarter, year }} = useAppSelector(state => state.global)
	const [ isAdminModalVisible, setIsAdminModalVisible ] = useState(false)
	const [ activeUsuarioReview, setActiveUsuarioReview ] = useState<any>(null)
    
    const dispatch = useAppDispatch()
    
    const { debouncedValue } = useDebounce(search, 500)

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
			title: () => ( <p className='tableTitle text-right'> Total Objetivos </p>),
			key: 'totalObjetivos',
			render: (text, record) => (
				<p className='text-default text-right'> {record.rendimiento.countObjetivos}  </p>
			),
			sorter: (a, b) => a.rendimiento.countObjetivos - b.rendimiento.countObjetivos,
		},
		{
			title: () => ( <p className='tableTitle text-right'> Resultado Objetivos </p>),
			key: 'resultadoObjetivos',
			render: (text, record) => (
				<p className='text-default text-right'> {Math.trunc(record.rendimiento.resultadoObjetivos * 100) / 100} % </p>
			),
			sorter: (a, b) => a.rendimiento.resultadoObjetivos - b.rendimiento.resultadoObjetivos,
		},
		{
			title: () => ( <p className='tableTitle text-right'> Resultado Competencias </p>),
			key: 'resultadoCompetencias',
			render: (text, record) => (
				<p className='text-default text-right'> {Math.trunc(record.rendimiento.resultadoCompetencias * 100) / 100} % </p>
			),
			sorter: (a, b) => a.rendimiento.resultadoCompetencias - b.rendimiento.resultadoCompetencias,
		},
		{
			title: () => ( <p className='tableTitle text-right'> Resultado Final </p>),
			key: 'resultadoFinal',
			render: (text, record) => (
				<p className='text-default text-right'> {Math.trunc(record.rendimiento.resultadoFinal * 100) / 100} % </p>
			),
			sorter: (a, b) => a.rendimiento.resultadoFinal - b.rendimiento.resultadoFinal,
		},
		{
			title: () => ( <p className='tableTitle text-right'> Bono Obtenido </p>),
			key: 'bonoObtenido',
			render: (text, record) => (
				<p className='text-default text-right'> {record.rendimiento.bono} % </p>
			),
			sorter: (a, b) => a.rendimiento.bono - b.rendimiento.bono,
		},
		{
			title: () => ( <p className='tableTitle text-right'> Estatus </p>),
			key: 'status',
			render: (text, record) => (
				<p className='text-default text-right' style={{
					color: getColor(record.rendimiento.status).color
				}}> 
					 {/* {statusTypes[record.rendimiento[0].status]} */}
					{ record.rendimiento.status }
				</p>
			),
			sorter: (a, b) => a.rendimiento.status.localeCompare(b.rendimiento.status),
		},
		{
			title: () => ( <p className='tableTitle text-right'>  </p>),
			key: '',
			render: (text, record) => (
				<button className='px-2 py-1 text-devarana-blue' onClick={ () => handleOpenAdminModal(record)}>
					<FaEye />
				</button>
			)
		}
	]

    const handleOpenAdminModal = (usuario: SinglePerfilProps) => {
        setActiveUsuarioReview(usuario)
        setIsAdminModalVisible(true)
    }

    const handleCloseAdminModal = () => {
        setIsAdminModalVisible(false)
    }

    const handleGenerateReport = () => {
		dispatch(generarReporteRendimientoThunk({ quarter, year, search, status }))
	}
	
	useEffect(() => {
		const promise = dispatch(obtenerUsuariosThunk({ quarter, year, search, status}))
		return () => {
			promise.abort()
		}
	}, [year, quarter, debouncedValue, status])

    
    return (
            <>
            <div className='flex gap-x-5 justify-end items-center py-2'>
                <Select
                    defaultValue=''
                    onChange = {(e) => setStatus(e)}
                    className='w-full text-devarana-graph'
                    style={{ width: 120 }}
                >
                    <Select.Option value=''> <span className='text-devarana-graph'>Todos</span> </Select.Option>
                    <Select.Option value='ABIERTO'> <span className='text-devarana-graph'>Abierto</span> </Select.Option>
                    <Select.Option value='CERRADO'> <span className='text-devarana-graph'>Cerrado</span> </Select.Option>
                </Select>
                <Input
                    style={{ width: 300 }}
                    placeholder='Buscar'
                    className='w-full'
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button classType='regular' classColor='primary' onClick={handleGenerateReport} disabled={isGeneratingReport} width={150}
                >
                    Exportar
                </Button>
            </div>
            <Table
                rowClassName={() => 'cursor-pointer hover:bg-gray-50 transition duration-200'}
                rowKey={(record) => record.id}
                loading={isLoadingUsuarios}
                columns={columns}
                dataSource={usuarios}
            >

            </Table>
            <Modal
                    open={isAdminModalVisible}
                    onCancel={handleCloseAdminModal}
                    footer={null}
                    width={window.innerWidth > 1200 ? 'calc(95% - 80px)' : '100%' }
                    style={{
                        top: 50,
                        left: 35,
                        bottom: 0,
                        height: 'calc(100% - 150px)',
                        overflowY: 'hidden',
                        borderRadius: '10px'
                    }}
                    destroyOnClose={true}
                >
                    <Administracion activeUsuario={activeUsuarioReview} isLeader={false}/>
            </Modal>
            </>
    )
}
