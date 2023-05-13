import { UsuarioProps } from '@/interfaces';
import { Avatar, Select, Tooltip } from 'antd'
import React from 'react'


interface Props {
	setSelectedUsers: (value: any) => void
	selectedUsers: any[]
	usuarios: UsuarioProps[]
}

export const AvatarSelect = ({setSelectedUsers, selectedUsers, usuarios}: Props) => {


	const tagRender = (props: any) => {
		const { label, value, closable, onClose } = props;

		const usuario = usuarios.find((usuario) => usuario.id === value)

		return (
			<Tooltip title={label} color='white' key={value} className='relative'>
				<Avatar 
					src={ import.meta.env.VITE_STORAGE_URL + usuario?.foto || undefined}
					style={{
						marginRight: -5
					}}
				>
					{usuario?.iniciales}
				</Avatar>
			</Tooltip>
		);
	}

    const spanUsuario = (usuario: UsuarioProps) => (

        <div className='flex items-center gap-x-2'>
            <Avatar
                src={import.meta.env.VITE_STORAGE_URL + usuario.foto}
            >
                {usuario.iniciales}
            </Avatar>
            <p className='font-light text-devarana-graph'>
                {usuario.nombre} {usuario.apellidoPaterno} 
            </p>
        </div>
    )



  return (
    <Select mode='multiple' placeholder='Selecciona' bordered={false}
        onChange={(value) => setSelectedUsers(value)} value={selectedUsers}
        tagRender={tagRender} maxTagCount={3} style={{ width: '100%' }}
        maxTagPlaceholder={(omittedValues) => (
            <span className='text-devarana-graph'>+{omittedValues.length}</span>
        )}
    >
        {
            usuarios.map((usuario) => (
                <Select.Option key={usuario.id} value={usuario.id}>
                    { spanUsuario(usuario) }
                </Select.Option>
            ))
        }
    </Select>
  )
}
