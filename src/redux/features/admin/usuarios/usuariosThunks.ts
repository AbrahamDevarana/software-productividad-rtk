import { AppDispatch, RootState } from '@/redux/store';
import { createUsuarioProvider, deleteUsuarioProvider, getUsuarioProvider, getUsuariosProvider, updateUsuarioProvider, uploadImageProvider, deleteImageProvider } from './usuariosProvider';
import { checkingUsuarios, getUsuario, getUsuarios, setUsuariosError, createUsuario, deleteUsuario, updateUsuario, cleanCurrentUsuario, clearUsuarios, clearAlertUsuarios } from './usuariosSlice';


export const getUsuariosThunk = (filtros: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingUsuarios())
        const result = await getUsuariosProvider(filtros, getState)
        
        if(!result.ok) return dispatch( setUsuariosError(result.errorMessage) )
        dispatch( getUsuarios(result.usuarios) )
    }
}

export const getUsuarioThunk = (usuarioId: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingUsuarios())
        const result = await getUsuarioProvider(usuarioId, getState)

        if(!result.ok) return dispatch( setUsuariosError(result.errorMessage) )
        dispatch( getUsuario(result.usuario) )
    }
}

export const createUsuarioThunk = (usuario: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingUsuarios())
        const result = await createUsuarioProvider(usuario, getState)

        if(!result.ok) return dispatch( setUsuariosError(result.errorMessage) )

        
        dispatch( createUsuario(result.usuario) )
    }
}

export const updateUsuarioThunk = (usuario: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingUsuarios())
        const result = await updateUsuarioProvider(usuario, getState)

        if(!result.ok) return dispatch( setUsuariosError(result.errorMessage) )
        dispatch( updateUsuario(result.usuario) )
    }
}

export const deleteUsuarioThunk = (usuarioId: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingUsuarios())
        const result = await deleteUsuarioProvider(usuarioId, getState)       
        if(!result.ok) return dispatch( setUsuariosError(result.errorMessage) )
        dispatch( deleteUsuario(usuarioId) )
    }
}


export const uploadImageThunk = (usuarioId: string, file: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingUsuarios())
        const result = await uploadImageProvider(usuarioId, file, getState)
        if(!result.ok) return dispatch( setUsuariosError(result.errorMessage) )
        // dispatch( updateUsuario(result.usuario) )
        return result
    }
}

export const deleteProfilePhotoThunk = (usuarioId: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingUsuarios())
        const result = await deleteImageProvider(usuarioId, getState)
        if(!result.ok) return dispatch( setUsuariosError(result.errorMessage) )
        // dispatch( updateUsuario(result.usuario) )s        
        return result
    }
}


export const cleanCurrentUsuarioThunk = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(cleanCurrentUsuario())
    }
}

export const clearUsuariosThunk = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(clearUsuarios())
    }
}

export const clearAlertUsuariosThunk = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(clearAlertUsuarios())
    }
}