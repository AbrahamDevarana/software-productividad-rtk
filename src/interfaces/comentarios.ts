import { UsuarioProps } from "./usuario";


export interface ComentarioProps {
    id: string;
    comentableId: string | number;
    comentableType: string;
    autorId: string;
    mensaje: string;
    createdAt: Date;
    autor: UsuarioProps;
}

export interface ComentariosState {
    comentarios: ComentarioProps[];
    isLoading: boolean;
    isCreating: boolean;
    error: boolean;
    infoMessage: string;
}
