import { Pagination, Table, Tooltip, Input, FloatButton, Modal, Avatar, Image } from "antd"
import { Box, Button } from "@/components/ui"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect, useState } from "react"
import {useGetUsuariosQuery, useDeleteUsuarioMutation, useGetUsuarioQuery } from "@/redux/features/usuarios/usuariosThunks"
import { ColumnsType } from "antd/es/table"
import { FormUsuarios } from './components/FormUsuarios';
import dayjs from 'dayjs';
import { FaExclamationTriangle, FaPen, FaPlus, FaTrash } from "react-icons/fa"
import { UsuarioProps } from "@/interfaces"
import { useDebounce } from "@/hooks/useDebouce"
import { getStorageUrl } from "@/helpers"
import getBrokenUser from "@/helpers/getBrokenUser"



const initialValues = {
  size: 10,
  page: 0,
}

export const Usuarios: React.FC = () => {
	const [formVisible, setFormVisible] = useState<boolean>(false)
    const [deleteUsuario, {isLoading: isDeleting}] = useDeleteUsuarioMutation()
    const [usuarioId, setUsuarioId] = useState<string>('')

    const { confirm } = Modal;
    const [search, setSearch] = useState('')

    const { data: usuarios, isLoading, isFetching } = useGetUsuariosQuery({search, status: 'ALL'})    

    const showDeleteConfirm = (id: string) => {
        confirm({
            title: (<p className='text-devarana-graph'>¿Estas seguro de eliminar esta estrategia?</p>),
            content: (<p className='text-devarana-graph'>Una vez eliminado no podras recuperarlo</p>),
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                await deleteUsuario(id)
                
            }
        });
    }

    const columns: ColumnsType<UsuarioProps> = [
		{
			render: (text, record, index) => Object.values(record).some(val => val === null) ? 
			<Tooltip title="Este usuario no ha completado su registro">
				<span>
                    <FaExclamationTriangle className="text-yellow-300" />
                </span>
			</Tooltip>
			: null,

			width: 35
		},
        {
            title: () => ( <p className='tableTitle'></p>),
            width: 60,
            render: (text, record, index) => ( 
            <Avatar
                src={<Image src={`${getStorageUrl(record.foto)}`} preview={false} fallback={getBrokenUser()} />}
                className=''
            >
                {record.iniciales}
            </Avatar>),
        },
        {
            title: () => ( <p className='tableTitlePrincipal'>Nombre</p>),
            key: "nombre",
			render: (text, record, index) => ( <p className="text-devarana-graph"> {record.nombre} {record.apellidoPaterno} {record.apellidoMaterno} </p>),
			ellipsis: true
        },
		{
			title: () => ( <p className='tableTitle'>Email</p>),
			key: "email",
            ellipsis: true,
            render: (text, record, index) => ( <p className="text-devarana-graph"> {record.email} </p>)
		},
		{
			title: () => ( <p className='tableTitle'>Fecha Nacimiento</p>),
			key: "fechaNacimiento",
            render: (text, record, index) => ( <p className="text-devarana-graph"> {record.fechaNacimiento? `${dayjs(record.fechaNacimiento, 'YYYY-MM-DD').locale('es').format('D MMMM YYYY')}` : 'No especificado'} </p>),
			ellipsis: true
		},
		{
			title: () => ( <p className='tableTitle'>Fecha Ingreso</p>),
			key: "fechaIngreso",
            render: (text, record, index) => ( <p className="text-devarana-graph"> {record.fechaIngreso? `${dayjs(record.fechaIngreso, 'YYYY-MM-DD').locale('es').format('D MMMM YYYY')}` : 'No especificado'} </p>),
			ellipsis: true
		},
        {
            title: () => ( <p className='tableTitle'>Status</p>),
            key: "status",
            render: (text, record, index) => ( <div className={`h-5 w-5 ${record.status === 'ACTIVO' ? 'bg-green-400' : 'bg-red-400'} rounded-full`}></div>),
            ellipsis: true,
            width: 100
        },
		{
            title: () => ( <p className='tableTitle'>Acciones</p>),
            key: "acciones",
			render: (text, record, index) => (
				<div className="flex gap-2">
                    <Button
                        classType="regular"
                        classColor="info"
                        width={'auto'}
                        onClick={() => {
                            handleEdit(record.id)
                        } }
                    >
                        <FaPen />
                    </Button>
                    <Button
                        classType="regular"
                        classColor="error"
                        width={'auto'}
                        onClick={() => showDeleteConfirm(record.id) }
                    >
                        <FaTrash />
                    </Button>
                </div>
			),
			width: 150
		}

    ]
   
	const handleEdit = (id: any) => {
        setUsuarioId(id)
        setFormVisible(true)
    }

    const handleModal = (status : boolean) => {
        setFormVisible(status)
    }

    console.log(usuarios);
    

    return (
        <>
            <Box className="overflow-auto animate__animated animate__fadeIn">
                <div className="flex justify-end gap-5 pb-3">
                    <Input
                        placeholder="Buscar"
                        className="max-w-xs w-full"
                        allowClear
                        onChange={(e: any) => {
                            setSearch(e.target.value)
                        }}
                    />
                    <FloatButton
                        shape="circle"
                        icon={<FaPlus />}
                        onClick={(() => handleModal(true))}
                    />
                </div>
            <Table
                columns={columns}
                dataSource={usuarios}
                loading={isLoading || isFetching || isDeleting}
                rowKey={(record) => record.id}
                className="customTable"
            >
            </Table>
          
            </Box>
            <FormUsuarios usuarioId={usuarioId} visible={formVisible} handleModal={handleModal}/>
        </>

        
    )
}
