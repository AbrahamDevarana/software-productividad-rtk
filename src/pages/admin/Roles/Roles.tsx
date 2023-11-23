import { Box, Button } from '@/components/ui'
import { FloatButton, Input, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa'

export const Roles = () => {

	const [filtros, setFiltros] = useState<any>()

	const roles = [ 
		{
			id: 1,
			nombre: 'Administrador',
			descripcion: 'crear usuarios',
		},
		{
			id: 2,
			nombre: 'Coordinador',
			descripcion: 'editar usuarios',
		},
		{
			id: 3,
			nombre: 'Gerente',
			descripcion: 'eliminar usuarios',
		},
		{
			id: 4,
			nombre: 'Capital Humano',
			descripcion: 'ver usuarios',
		},
		{
			id: 5,
			nombre: 'Director',
			descripcion: 'ver usuarios',
		}

	
	]

	const columns:ColumnsType<any> = [
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
                            // handleEdit(record.id)
                        } }
                    >
                        <FaPen />
                    </Button>
                    <Button
                        classType='regular'
                        classColor='error'
                        width={'auto'}
                        // onClick={() => showDeleteConfirm(record.id) }
                    >
                        <FaTrash />
                    </Button>
                </div>
            ),
        },
	]

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
					// onClick={(() => handleModal(true))}
				/>
				</div>
				<Table 
					columns={columns}
					dataSource={roles}
					rowKey={(record) => record.id}
					pagination={false}
				/>

			</Box>
			
		</>
	)
}
