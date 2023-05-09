import { UsuarioProps } from "@/interfaces";
import { Avatar, Tooltip } from "antd";
import { useEffect, useState } from "react";


export const useSelectUser = (usuarios:UsuarioProps[]) => {

    const [ selectedUsers, setSelectedUsers ] = useState<any[]>([]);

    useEffect(() => {
        if(usuarios && usuarios.length > 0) {
            setSelectedUsers(usuarios.map(usuario => usuario.id))
        }
    }, [usuarios])


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

    return {
        tagRender, spanUsuario, selectedUsers, setSelectedUsers
    }
}