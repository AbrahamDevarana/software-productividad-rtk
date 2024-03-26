import { FormPermisos } from '@/components/forms/FormPermisos'
import { Box, Button } from '@/components/ui'
import { useGetPermisosQuery } from '@/redux/features/permisos/PermisosThunk'
import { FloatButton, Input, Modal, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useMemo, useState } from 'react'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa'

export const Permisos = () => {

	const [filtros, setFiltros] = useState<any>()
	const [visible, setFormVisible] = useState<boolean>(false)
	const [permisoId, setPermisoId] = useState<number>(0)

	const confirm = Modal.confirm

	const columns:ColumnsType<any> = [
		{
			title: () => ( <p className='tableTitlePrincipal'>Nombre</p>),
			key: "nombre",
			render: (text, record, index) => ( <p className="text-devarana-graph"> { record.nombre } </p>),
			ellipsis: true
		},
		{
			title: () => ( <p className='tableTitle'>Permiso</p>),
			key: "permisos",
			render: (text, record, index) => ( <p className="text-devarana-graph"> { record.permisos } </p>),
			ellipsis: true
		},
		{
            title: () => ( <p className='tableTitle'>Acciones</p>),
            key: "acciones",
            width: 150,
            render: (text, record, index) => (
                <div className="flex gap-2">
                    <Button
                        classType='regular'
                        classColor='info'
                        width={'auto'}
                        onClick={() => {
                            handleEdit(record.id)
                        } }
                    >
                        <FaPen />
                    </Button>
                    <Button
                        classType='regular'
                        classColor='error'
                        width={'auto'}
                        onClick={() => handleDelete(record.id)}
                    >
                        <FaTrash />
                    </Button>
                </div>
            ),
        },
	]

	const { data, isLoading, isFetching } = useGetPermisosQuery(filtros)

	const permisos = useMemo(() => {
		if (!data) return []
		if (!filtros?.nombre) return data
		const regex = new RegExp(filtros.nombre, 'iu')
		return data.filter((permiso) => regex.test(permiso.nombre) || regex.test(permiso.permisos))		
	}, [data, filtros])

	const handleEdit = (id: number) => {
		setPermisoId(id)
		setFormVisible(true)
	}

	const handleClose = () => {
		setFormVisible(false)
		setPermisoId(0)
	}

	const handleDelete = async (id: number) => {
		confirm({
			title: '¿Está seguro de eliminar este registro?',
			content: 'Esta acción no se puede deshacer',
			okText: 'Eliminar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk: async () => {
				// await deleteRol(id)
				// await refetch()
			},
			onCancel() {
			},
		})
	}

	return (
		<>
			<Box className="overflow-auto animate__animated animate__fadeIn animate__faster">
			<div className="flex justify-end gap-5 pb-5">
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
					onClick={() => setFormVisible(true)}
				/>
				</div>
				<Table 
					columns={columns}
					dataSource={permisos}
					rowKey={(record) => record.id}
					loading={isLoading || isFetching}
				/>
			</Box>

			<Modal	
				open={visible}
				title={permisoId ? <p className="text-devarana-graph">Editar permiso</p> : <p className="text-devarana-graph">Nuevo permiso</p>}
				onCancel={handleClose}
				footer={null}
				width={700}
				destroyOnClose={true}
				>
				<FormPermisos
					permisoId={permisoId}
					handleClose={handleClose}
				/>
			</Modal>
			
		</>
	)
}
