import { UsuarioProps } from "./usuario";


export interface ComentarioProps {
    comentableId: string;
    comentableType: string;
    autorId: string;
    mensaje: string;
    autor?: UsuarioProps;
}
