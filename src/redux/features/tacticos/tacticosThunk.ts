import { useNotification } from '@/hooks/useNotification';
import { AppDispatch, RootState } from '@/redux/store';
import { createTacticoProvider, deleteTacticoProvider, getTacticoProvider, getTacticosProvider, updateTacticoProvider, getTacticoFromAreaProvider} from './tacticosProvider';
import { checkingTacticos, setTacticosError, getCurrentTactico, createTactico, deleteTactico, getTacticos, updateTactico, clearCurrentTactico, clearTacticos } from './tacticosSlice';


export const getTacticosThunk = (filtros: any) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingTacticos())
        const result = await getTacticosProvider(filtros, getState)        
        if(!result.ok) return dispatch( setTacticosError(result.errorMessage) )
        dispatch( getTacticos(result.tacticos) )
    }   
}

export const getTacticoThunk = (tacticosId: string) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingTacticos())
        const result = await getTacticoProvider(tacticosId, getState)        
        if(!result.ok) return dispatch( setTacticosError(result.errorMessage) )
        dispatch( getCurrentTactico(result.tactico) )
    }   
}

export const getTacticoFromAreaThunk = (slug: string) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingTacticos())
        const result = await getTacticoFromAreaProvider(slug, getState)
        if(!result.ok) return dispatch( setTacticosError(result.errorMessage) )
        dispatch( getTacticos(result.tacticos) )
    }
}


export const createTacticoThunk = (tactico: any) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingTacticos())
        const result = await createTacticoProvider(tactico, getState)
        if(!result.ok) return dispatch( setTacticosError(result.errorMessage) )
        useNotification({type: 'success', message: 'Tactico creada correctamente'})
        dispatch( createTactico(result.tactico) )
    }   
}

export const deleteTacticoThunk = (tacticosId: number) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingTacticos())
        const result = await deleteTacticoProvider(tacticosId, getState)
        if(!result.ok) return dispatch( setTacticosError(result.errorMessage) )
        useNotification({type: 'success', message: 'Tactico eliminada correctamente'})
        dispatch( deleteTactico(tacticosId) )
    }   
}

export const updateTacticoThunk = (tactico: any) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingTacticos())
        const result = await updateTacticoProvider(tactico, getState)
        if(!result.ok) return dispatch( setTacticosError(result.errorMessage) )
        useNotification({type: 'success', message: 'Tactico actualizada correctamente'})
        dispatch( updateTactico(result.tactico) )
    }   
}


export const clearTacticosThunk = () => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingTacticos())
        dispatch( clearTacticos() )        
    }   
}
    
export const clearCurrentTacticoThunk = () => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingTacticos())
        dispatch( clearCurrentTactico() )        
    }   
}