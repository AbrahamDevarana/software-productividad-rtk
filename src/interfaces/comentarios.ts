import { UsuarioProps } from "./usuario";


export interface ComentarioProps {
    id: string;
    comentableId: string;
    comentableType: string;
    autorId: string;
    mensaje: string;
    createdAt: Date;
    autor: UsuarioProps;
}
