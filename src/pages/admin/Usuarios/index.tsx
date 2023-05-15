import { Pagination, Table, Tooltip, Input, FloatButton } from "antd"
import { Box, Button } from "@/components/ui"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect, useState } from "react"
import { getUsuariosThunk, deleteUsuarioThunk, getUsuarioThunk, clearUsuariosThunk } from "@/redux/features/admin/usuarios/usuariosThunks"
import { ColumnsType } from "antd/es/table"
import { Icon } from "@/components/Icon"
import { useDelete } from "@/hooks/useDelete"
import useNotify from "@/hooks/useNotify"
import { FormUsuarios } from './components/FormUsuarios';
import dayjs from 'dayjs';
import { FaPlus } from "react-icons/fa"



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
	const { usuarios, infoMessage, paginate} = useAppSelector((state: any) => state.usuarios)
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(getUsuariosThunk(filtros))
	  return () => {
		  dispatch(clearUsuariosThunk())
	  }
    }, [filtros])


	async function handleDelete(id: string) {
		const confirmed = await useDelete('¿Estás seguro que deseas eliminar este elemento?');
		if (confirmed) {
			dispatch(deleteUsuarioThunk(id))
		}
	}

    const isComplete = (data: any) => ( (Object.values(data).some(val => val === null) ? false : true ) ||
    data.fechaNacimiento === null || data.fechaIngreso === null || data.leaderId === null || 
    data.departamentoId === null) ? false : true
    
    const columns: ColumnsType <DataType> = [
		{
			render: (data: any) => Object.values(data).some(val => val === null) ? 
			<Tooltip title="Este usuario no ha completado su registro">
				<span><Icon iconName="faExclamationTriangle" className="text-yellow-300" /></span>
			</Tooltip>
			: null,

			width: 35
		},
        {
            title: "Nombre",
            key: "nombre",
			render: (data: any) => `${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno}`,
			ellipsis: true
        },
		{
			title: "Email",
			key: "email",
			dataIndex: "email",
			ellipsis: true
		},
		{
			title: "Fecha Nacimiento",
			key: "fechaNacimiento",
            render: (data: any) => data.fechaNacimiento ? `${dayjs(data.fechaNacimiento, 'YYYY-MM-DD').locale('es').format('D MMMM YYYY')}` : 'No especificado',
			ellipsis: true
		},
		{
			title: "Fecha Ingreso",
			key: "fechaIngreso",
			render: (data: any) => data.fechaIngreso ? `${dayjs(data.fechaIngreso, 'YYYY-MM-DD').locale('es').format('D MMMM YYYY')}` : 'No especificado',
			ellipsis: true
		},
		{
            title: "Acciones",
            key: "acciones",
			render: (data: any) => (
				<div className="flex gap-2">
                    <Button
                        classType="icon"
                        classColor="warning"
                        onClick={() => {
                            handleEdit(data.id)
                        } }
                    >
                        <Icon iconName="faPen" />
                    </Button>
                    <Button
                        classType="icon"
                        classColor="error"
                        onClick={() => handleDelete(data.id) }
                    >
                        <Icon iconName="faTrash" />
                    </Button>
                </div>
			),
			width: 150
		}

    ]

	useEffect(() => {
        useNotify({ infoMessage })
    }, [infoMessage])
   
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
            >

            </Table>
            <Pagination
                    className="flex justify-end mt-5"
                    current={paginate.currentPage + 1}
                    total={paginate.totalItems}
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
