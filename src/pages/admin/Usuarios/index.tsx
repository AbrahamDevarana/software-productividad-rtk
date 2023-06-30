import { Pagination, Table, Tooltip, Input, FloatButton } from "antd"
import { Box, Button } from "@/components/ui"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect, useState } from "react"
import { getUsuariosThunk, deleteUsuarioThunk, getUsuarioThunk, clearUsuariosThunk } from "@/redux/features/admin/usuarios/usuariosThunks"
import { ColumnsType } from "antd/es/table"
import { Icon } from "@/components/Icon"
import { FormUsuarios } from './components/FormUsuarios';
import dayjs from 'dayjs';
import { FaPlus } from "react-icons/fa"
import { UsuarioProps } from "@/interfaces"



const initialValues = {
  size: 10,
  page: 0,
}

interface DataType {
  key: React.Key;
  id: string;
  nombre: string;
  email: string;
  fechaNacimiento: string;
  fechaIngreso: string;
  acciones: string;
}


export const Usuarios: React.FC = () => {
    const [filtros, setFiltros] = useState<any>(initialValues)
	const [formVisible, setFormVisible] = useState<boolean>(false)
	const { usuarios, infoMessage, paginate} = useAppSelector((state) => state.usuarios)
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(getUsuariosThunk(filtros))
	  return () => {
		  dispatch(clearUsuariosThunk())
	  }
    }, [filtros])


    const handleDelete = (id: string) => {
			dispatch(deleteUsuarioThunk(id))
		
	}

    // const isComplete = ({text, record, index}: ) => ( (Object.values(record).some(val => val === null) ? false : true ) ||
    // record.fechaNacimiento === null || record.fechaIngreso === null || record.leaderId === null || 
    // record.departamentoId === null) ? false : true
    
    const columns: ColumnsType<UsuarioProps> = [
		{
			render: (text, record, index) => Object.values(record).some(val => val === null) ? 
			<Tooltip title="Este usuario no ha completado su registro">
				<span><Icon iconName="faExclamationTriangle" className="text-yellow-300" /></span>
			</Tooltip>
			: null,

			width: 35
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
            title: () => ( <p className='tableTitle'>Acciones</p>),
            key: "acciones",
			render: (text, record, index) => (
				<div className="flex gap-2">
                    <Button
                        classType="icon"
                        classColor="warning"
                        onClick={() => {
                            handleEdit(record.id)
                        } }
                    >
                        <Icon iconName="faPen" />
                    </Button>
                    <Button
                        classType="icon"
                        classColor="error"
                        onClick={() => handleDelete(record.id) }
                    >
                        <Icon iconName="faTrash" />
                    </Button>
                </div>
			),
			width: 150
		}

    ]
   
	const handleEdit = (id: any) => {
        dispatch(getUsuarioThunk(id))
        setFormVisible(true)
    }

    
    const handleModal = (status : boolean) => {
        setFormVisible(status)
    }


    return (
        <>
            <Box className="overflow-auto animate__animated animate__fadeIn">
                <div className="flex justify-end gap-5 pb-3">
                    <Input
                        placeholder="Buscar"
                        className="max-w-xs w-full"
                        allowClear
                        onChange={(e: any) => {
                            setFiltros({
                                ...filtros,
                                nombre: e.target.value
                            })
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
                rowKey={(record) => record.id}
                pagination={false}
                className="customTable"
                // rowClassName={() => 'cursor-pointer hover:bg-gray-50 transition duration-200'}
            >
            </Table>
            <Pagination
                    className="flex justify-end mt-5"
                    current={paginate.currentPage + 1}
                    total={paginate.totalItem}
                    pageSize={filtros.size}
                    onChange={(page, pageSize) => {
                        setFiltros({
                            ...filtros,
                            page: page - 1,
                            size: pageSize
                        })
                }}
            />
            </Box>
            <FormUsuarios visible={formVisible} handleModal={handleModal}/>
        </>

        
    )
}
