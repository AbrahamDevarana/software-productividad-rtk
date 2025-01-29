import { getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { UsuarioProps } from "@/interfaces";
import { Avatar, Image, Tooltip } from "antd";
import { AvatarSize } from "antd/es/avatar/AvatarContext";
import { useEffect, useState } from "react";


export const useSelectUser = (usuarios?:UsuarioProps[], size?: AvatarSize) => {

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
                    size={size ? size : 'large'}
                    className="relative"
                >
                    {usuario?.iniciales}
                </Avatar>
                {closable && (
                <span
                    className='absolute -top-3 -right-3 text-xs text-white cursor-pointer z-10 bg-devarana-midnight rounded-full h-4 w-4 flex items-center justify-center'
                    onClick={(e) => {
                        e.stopPropagation(); // Evita que se abra el menú al cerrar la etiqueta
                        onClose();
                    }}
                >
                    ✕
                </span>
            )}
            </Tooltip>
        );
    }


    const spanUsuario = (usuario: UsuarioProps) => (

        <div className='flex items-center gap-x-2'>
            <Avatar
                src={<Image src={`${getStorageUrl(usuario?.foto)}`} preview={false} fallback={getBrokenUser()} />}
                size={size ? size : 'large'}
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