import { FormRoles } from '@/components/forms/FormRoles'
import { Box, Button } from '@/components/ui'
import { RoleProps } from '@/interfaces/rol'
import { useDeleteRolMutation, useGetRolQuery, useGetRolesQuery } from '@/redux/features/roles/rolesThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { FloatButton, Input, Modal, Table, message } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useMemo, useState } from 'react'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa'

export const Roles = () => {

	const [filtros, setFiltros] = useState<any>()
	const [visible, setFormVisible] = useState<boolean>(false)
	const [roleId, setRoleId] = useState<number>(0)

	const [deleteRol] = useDeleteRolMutation()

	const confirm = Modal.confirm

	const columns:ColumnsType<RoleProps> = [
		{
			title: () => ( <p className='tableTitlePrincipal'>Nombre</p>),
			key: "nombre",
			render: (text, record, index) => ( <p className="text-devarana-graph"> { record.nombre } </p>),
			ellipsis: true
		},
		{
			title: () => ( <p className='tableTitle'>Permiso</p>),
			key: "descripcion",
			render: (text, record, index) => ( <p className="text-devarana-graph"> { record.descripcion } </p>),
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
                        onClick={() => {
							handleDelete(record.id)
						}}
                    >
                        <FaTrash />
                    </Button>
                </div>
            ),
        },
	]
	const { data, isLoading } = useGetRolesQuery(filtros)


	const roles = useMemo(() => {
		if (!data) return []
		if (!filtros?.nombre) return data
		const regex = new RegExp(filtros.nombre, 'iu')
		return data.filter((rol) => regex.test(rol.nombre) || regex.test(rol.descripcion))		
	}, [data, filtros])

	const handleEdit = (id: number) => {
		setRoleId(id)
		setFormVisible(true)
	}

	const handleClose = () => {
		setFormVisible(false)
		setRoleId(0)
	}

	const handleDelete = async (id: number) => {
		confirm({
			title: '¿Estás seguro de eliminar este rol?',
			content: 'Esta acción no se puede revertir',
			okText: 'Eliminar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk: async () => {
				await deleteRol(id).then(() => {
					message.success('Rol eliminado correctamente')
				}).catch(() => {
					message.error('Ocurrió un error al eliminar el rol')
				})
			},
			onCancel() {
				console.log('Cancel');
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
					loading={isLoading}
					dataSource={roles}
					rowKey={(record) => record.id}
					pagination={false}
				/>
			</Box>

			<Modal 
				title={roleId ? <p className="text-devarana-graph">Editar Rol</p> : <p className="text-devarana-graph">Nuevo Rol</p>}
				open={visible}
				onCancel={handleClose}
				destroyOnClose={true}
				width={700}
				footer={null}
			>
				<FormRoles roleId={roleId}/>
			</Modal>
		</>
	)
}
