import { getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { UsuarioProps } from "@/interfaces";
import { Avatar, Image, Tooltip } from "antd";
import { useEffect, useState } from "react";


export const useSelectUser = (usuarios?:UsuarioProps[]) => {

    const [ selectedUsers, setSelectedUsers ] = useState<any[]>([]);

    useEffect(() => {
        if(usuarios && usuarios.length > 0) {
            setSelectedUsers(usuarios.map(usuario => usuario.id))
        }
    }, [usuarios])


    const tagRender = (props: any) => {
        const { label, value, closable, onClose } = props;

        const usuario = usuarios!.find((usuario) => usuario.id === value)

        return (
            <Tooltip title={label} color='white' key={value} className='relative'>
                <Avatar 
                    src={ <Image src={`${getStorageUrl(usuario?.foto)}`} preview={false} fallback={getBrokenUser()} /> }
                    style={{
                        marginRight: -5
                    }}
                    size={'large'}
                >
                    {usuario?.iniciales}
                </Avatar>
            </Tooltip>
        );
    }


    const spanUsuario = (usuario: UsuarioProps) => (

        <div className='flex items-center gap-x-2 h-full'>
            <Avatar
                src={<Image src={`${getStorageUrl(usuario.foto)}`} preview={false} fallback={getBrokenUser()} />}
                size={'large'}
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