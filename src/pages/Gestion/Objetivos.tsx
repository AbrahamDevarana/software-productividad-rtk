import { Avatar, Image, Input, Modal, Select, Table } from 'antd'
import { useState } from 'react'
import { Button } from '../../components/ui'
import { Administracion } from '../../components/operativo'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { SinglePerfilProps, UsuarioGestion } from '@/interfaces'
import { ColumnsType } from 'antd/es/table'
import { generarReporteRendimientoThunk, useGetGestionObjetivosQuery } from '@/redux/features/gestion/gestionThunk'
import { FaEye } from 'react-icons/fa'
import { getColor, getStorageUrl } from '@/helpers'
import { LuRefreshCw } from "react-icons/lu";
import { periodoTypesGestion } from '@/types'
import getBrokenUser from '@/helpers/getBrokenUser'
import { ModalReport } from './components/ModalReport'



export const Objetivos = () => {
    
    const [modalReportVisible, setModalReportVisible] = useState(false)

    const [search, setSearch] = useState('')
	const [status, setStatus] = useState('')
    const [statusUsuario, setStatusUsuario] = useState('ACTIVO')
    const { isGeneratingReport } = useAppSelector(state => state.gestion)
    const { currentConfig: { quarter, year }} = useAppSelector(state => state.global)
	const [ isAdminModalVisible, setIsAdminModalVisible ] = useState(false)
	const [ activeUsuarioReview, setActiveUsuarioReview ] = useState<any>(null)
	

	const { data: usuarios, isLoading, refetch , isFetching } = useGetGestionObjetivosQuery({ quarter, year, search, status, statusUsuario })

    const dispatch = useAppDispatch()

    const columns: ColumnsType<UsuarioGestion> = [
		{
			title: () => ( <p className='tableTitlePrincipal'>Nombre</p>),
			key: 'name',
			render: (text, record) => (
				<div className='flex items-center gap-x-2'>
                    <Avatar shape='circle' size={'large'}  src={<Image className='w-full' src={getStorageUrl(record.foto)} preview={false} fallback={getBrokenUser()} /> } />
                    <p className='text-devarana-graph'>
                        {record.nombre} {record.apellidoPaterno}  {record.apellidoMaterno} 
                    </p>
                </div>
			)
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
					{ periodoTypesGestion[record.rendimiento.status] }
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

    const handleGenerateExcel = () => {
		dispatch(generarReporteRendimientoThunk({ quarter, year, search, status, statusUsuario }))
	}
	


    return (
            <>
            <div className='flex gap-x-5 justify-end items-center py-2'>
                <div className='flex flex-col align-middle'>
                    <p className='text-xs text-devarana-graph px-1'> Usuarios: </p>
                    <Select
                        id='statusUsuario'
                        defaultValue='ACTIVO'
                        onChange = {(e) => setStatusUsuario(e)}
                        className='w-full text-devarana-graph'
                        style={{ width: 250 }}
                    >
                        <Select.Option value=''> <span className='text-devarana-graph'>Todos</span> </Select.Option>
                        <Select.Option value='ACTIVO'> <span className='text-devarana-graph'>Activos</span> </Select.Option>
                        <Select.Option value='INACTIVO'> <span className='text-devarana-graph'>Inactivos</span> </Select.Option>
                    </Select>
                </div>
               <div className='flex flex-col align-middle'>
                <p className='text-xs text-devarana-graph px-1'> Estatus: </p>
                <Select
                        defaultValue=''
                        onChange = {(e) => setStatus(e)}
                        className='w-full text-devarana-graph'
                        style={{ width: 250 }}
                    >
                        <Select.Option value=''> <span className='text-devarana-graph'>Todos</span> </Select.Option>
                        <Select.Option value='NUEVO'> <span className='text-devarana-graph'>Nuevo</span> </Select.Option>
                        <Select.Option value='ABIERTO'> <span className='text-devarana-graph'>En Ejecución</span> </Select.Option>
                        <Select.Option value='PENDIENTE_AUTORIZAR'> <span className='text-devarana-graph'>En Aprobación</span> </Select.Option>
                        <Select.Option value='APROBADO'> <span className='text-devarana-graph'>Aprobado</span> </Select.Option>
                        <Select.Option value='PENDIENTE_APROBACION'> <span className='text-devarana-graph'>En Evaluación</span> </Select.Option>
                        <Select.Option value='CERRADO'> <span className='text-devarana-graph'>Cerrado</span> </Select.Option>
                    </Select>
                </div>
                <div className='flex flex-col align-middle'>
                    <p className='text-xs text-devarana-graph px-1'> Buscar: </p>
                    <Input
                        style={{ width: 300 }}
                        placeholder='Ingresa el nombre del usuario'
                        className='w-full'
                        allowClear  
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Button classType='regular' classColor='primary' onClick={handleGenerateExcel} disabled={isGeneratingReport} width={150}
                >
                    <p>Generar Excel</p>
                </Button>

                <Button classType='regular' classColor='secondary' width={150} onClick={ () => setModalReportVisible(true)} disabled={isGeneratingReport}>
                    <p>Generar Pdf</p>
                </Button>

				<Button classColor='dark' classType='regular' width={50} onClick={() => refetch()}>
					<LuRefreshCw className='text-white text-2xl' />
				</Button>
            </div>
            <Table
                rowClassName={() => 'cursor-pointer hover:bg-gray-50 transition duration-200'}
                rowKey={(record) => record.id}
                loading={isLoading || isFetching}
                columns={columns}
                dataSource={ usuarios }
				
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

            <ModalReport modalReportVisible={modalReportVisible} setModalReportVisible={setModalReportVisible} />

            
            </>
    )
}
