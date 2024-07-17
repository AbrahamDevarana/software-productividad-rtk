import { UsuarioProps } from "./usuario";


export interface ComentarioProps {
    id: number;
    comentableId: string | number;
    comentableType: string;
    autorId: string;
    mensaje: string;
    createdAt?: string;
    autor: UsuarioProps;
}

export interface ComentariosState {
    comentarios: ComentarioProps[];
    isLoading: boolean;
    isCreating: boolean;
    error: boolean;
    infoMessage: string;
}
