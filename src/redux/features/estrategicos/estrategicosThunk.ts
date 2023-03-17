import { useNotification } from '@/hooks/useNotification';
import { AppDispatch, RootState } from '@/redux/store';
import { createEstrategicoProvider, deleteEstrategicoProvider, getEstrategicoProvider, getEstrategicosProvider, updateEstrategicoProvider} from './estrategicosProvider';
import { checkingEstrategicos, setEstrategicosError, getCurrentEstrategico, createEstrategico, deleteEstrategico, getEstrategicos, updateEstrategico, clearCurrentEstrategico, clearEstrategicos } from './estrategicosSlice';
import { createEstrategicoFromProvider } from '../perspectivas/perspectivasSlice';


export const getEstrategicosThunk = (filtros: any) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingEstrategicos())
        const result = await getEstrategicosProvider(filtros, getState)        
        if(!result.ok) return dispatch( setEstrategicosError(result.errorMessage) )
        dispatch( getEstrategicos(result.estrategicos) )
    }   
}

export const getEstrategicoThunk = (estrategicosId: number) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingEstrategicos())
        const result = await getEstrategicoProvider(estrategicosId, getState)
        if(!result.ok) return dispatch( setEstrategicosError(result.errorMessage) )
        dispatch( getCurrentEstrategico(result.estrategico) )
    }   
}

export const createEstrategicoThunk = (estrategico: any) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingEstrategicos())
        const result = await createEstrategicoProvider(estrategico, getState)
        if(!result.ok) return dispatch( setEstrategicosError(result.errorMessage) )
        useNotification({type: 'success', message: 'Estrategico creada correctamente'})
        dispatch( createEstrategico(result.estrategico) )
    }   
}


export const createEstrategicoFromPerspectivaThunk = (estrategico: any) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingEstrategicos())
        const result = await createEstrategicoProvider(estrategico, getState)
        if(!result.ok) return dispatch( setEstrategicosError(result.errorMessage) )
        useNotification({type: 'success', message: 'Estrategico creada correctamente'})
        dispatch( createEstrategicoFromProvider(result.estrategico) )
    }
}


export const deleteEstrategicoThunk = (estrategicosId: number) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingEstrategicos())
        const result = await deleteEstrategicoProvider(estrategicosId, getState)
        if(!result.ok) return dispatch( setEstrategicosError(result.errorMessage) )
        useNotification({type: 'success', message: 'Estrategico eliminada correctamente'})
        dispatch( deleteEstrategico(estrategicosId) )
    }   
}

export const updateEstrategicoThunk = (estrategico: any) => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingEstrategicos())
        const result = await updateEstrategicoProvider(estrategico, getState)
        if(!result.ok) return dispatch( setEstrategicosError(result.errorMessage) )
        useNotification({type: 'success', message: 'Estrategico actualizada correctamente'})
        dispatch( updateEstrategico(result.estrategico) )
    }   
}


export const clearEstrategicosThunk = () => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingEstrategicos())
        dispatch( clearEstrategicos() )        
    }   
}
    
export const clearCurrentEstrategicoThunk = () => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch(checkingEstrategicos())
        dispatch( clearCurrentEstrategico() )        
    }   
}