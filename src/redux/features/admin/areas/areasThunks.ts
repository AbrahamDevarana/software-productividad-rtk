import { useNotification } from '../../../../hooks/useNotification';
import { AppDispatch, RootState } from '../../../store';
import { getAreasProvider, getAreaProvider, createAreaProvider, deleteAreaProvider, updateAreaProvider } from './areasProvider';
import { checkingAreas, setAreasError, getCurrentArea, createArea, deleteArea, getAreas, updateArea, clearAreas, clearCurrentArea } from './areasSlice';


// Get Areas
export const getAreasThunk = (filtros: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingAreas())
        const result = await getAreasProvider(filtros, getState)
        if(!result.ok) return dispatch( setAreasError(result.errorMessage) )
        
        dispatch( getAreas(result.areas) )
    }
}

// Get Area
export const getAreaThunk = (areaId: number) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingAreas())
        const result = await getAreaProvider(areaId, getState)        
        if(!result.ok) return dispatch( setAreasError(result.errorMessage) )
        
        dispatch( getCurrentArea(result.area) )
    }
}

// Create Area

export const createAreaThunk = (area: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingAreas())
        const result = await createAreaProvider(area, getState)        
        if(!result.ok) return dispatch( setAreasError(result.errorMessage) ); useNotification({type: 'error', message: result.errorMessage})
        useNotification({type: 'success', message: 'Área creada correctamente'})
        dispatch( createArea(result.area) )
    }
}

// Delete Area
export const deleteAreaThunk = (areaId: number) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingAreas())
        const result = await deleteAreaProvider(areaId, getState)        
        if(!result.ok) return dispatch( setAreasError(result.errorMessage) )
        useNotification({type: 'success', message: 'Área eliminada correctamente'})
        dispatch( deleteArea(areaId) )
    }
}

// Update Area
export const updateAreaThunk = (area: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingAreas())
        const result = await updateAreaProvider(area, getState)        
        if(!result.ok) return dispatch( setAreasError(result.errorMessage) )
        useNotification({type: 'success', message: 'Área actualizada correctamente'})
        dispatch( updateArea(result.area) )
        dispatch( clearCurrentArea() )
    }
}


//  Clean Area
export const cleanAreaThunk = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( clearAreas() )
    }
}

export const clearCurrentAreaThunk = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( clearCurrentArea() )
    }
}