import { useNotification } from '@/hooks/useNotification';
import { AppDispatch, RootState } from '@/redux/store';
import { createPerspectivaProvider, deletePerspectivaProvider, getPerspectivaProvider, getPerspectivasProvider, updatePerspectivaProvider} from './perspectivasProvider';
import { checkingPerspectivas, setPerspectivasError, getCurrentPerspectiva, createPerspectiva, deletePerspectiva, getPerspectivas, updatePerspectiva, clearCurrentPerspectiva, clearPerspectivas } from './perspectivasSlice';


export const getPerspectivasThunk = (filtros: any) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingPerspectivas())
        const result = await getPerspectivasProvider(filtros, getState)
        if(!result.ok) return dispatch( setPerspectivasError(result.errorMessage) )
        dispatch( getPerspectivas(result.perspectivas) )
    }   
}

export const getPerspectivaThunk = (perspectivaId: number) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingPerspectivas())
        const result = await getPerspectivaProvider(perspectivaId, getState)
        if(!result.ok) return dispatch( setPerspectivasError(result.errorMessage) )
        dispatch( getCurrentPerspectiva(result.perspectiva) )
    }   
}

export const createPerspectivaThunk = (perspectiva: any) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingPerspectivas())
        const result = await createPerspectivaProvider(perspectiva, getState)
        if(!result.ok) return dispatch( setPerspectivasError(result.errorMessage) )
        useNotification({type: 'success', message: 'Perspectiva creada correctamente'})
        dispatch( createPerspectiva(result.perspectiva) )
    }   
}

export const deletePerspectivaThunk = (perspectivaId: number) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingPerspectivas())
        const result = await deletePerspectivaProvider(perspectivaId, getState)
        if(!result.ok) return dispatch( setPerspectivasError(result.errorMessage) )
        useNotification({type: 'success', message: 'Perspectiva eliminada correctamente'})
        dispatch( deletePerspectiva(perspectivaId) )
    }   
}

export const updatePerspectivaThunk = (perspectiva: any) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingPerspectivas())
        const result = await updatePerspectivaProvider(perspectiva, getState)
        if(!result.ok) return dispatch( setPerspectivasError(result.errorMessage) )
        useNotification({type: 'success', message: 'Perspectiva actualizada correctamente'})
        dispatch( updatePerspectiva(result.perspectiva) )
    }   
}


export const clearPerspectivasThunk = () => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingPerspectivas())
        dispatch( clearPerspectivas() )        
    }   
}
    
export const clearCurrentPerspectivaThunk = () => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingPerspectivas())
        dispatch( clearCurrentPerspectiva() )        
    }   
}