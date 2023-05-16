import { AppDispatch, RootState } from '../../../store';
import { getDepartamentosProvider, getDepartamentoProvider, createDepartamentoProvider, deleteDepartamentoProvider, updateDepartamentoProvider, getLideresDepartamentoProvider } from './departamentosProvider';
import { checkingDepartamentos, setDepartamentosError, getCurrentDepartamento, createDepartamento, deleteDepartamento, getDepartamentos, updateDepartamento, clearDepartamentos, clearCurrentDepartamento, getLideresDepartamento } from './departamentosSlice';


// Get Departamentos
export const getDepartamentosThunk = (filtros: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingDepartamentos())
        const result = await getDepartamentosProvider(filtros, getState)
        if(!result.ok) return dispatch( setDepartamentosError(result.errorMessage) )
        
        dispatch( getDepartamentos(result.departamentos) )
    }
}

// Get Departamento
export const getDepartamentoThunk = (departamentoId: number) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingDepartamentos())
        const result = await getDepartamentoProvider(departamentoId, getState)        
        if(!result.ok) return dispatch( setDepartamentosError(result.errorMessage) )
        
        dispatch( getCurrentDepartamento(result.departamento) )
    }
}

// Create Departamento

export const createDepartamentoThunk = (departamento: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingDepartamentos())
        const result = await createDepartamentoProvider(departamento, getState)        
        if(!result.ok) return dispatch( setDepartamentosError(result.errorMessage) ); 
        dispatch( createDepartamento(result.departamento) )
    }
}

// Delete Departamento
export const deleteDepartamentoThunk = (departamentoId: number) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingDepartamentos())
        const result = await deleteDepartamentoProvider(departamentoId, getState)        
        if(!result.ok) return dispatch( setDepartamentosError(result.errorMessage) )
        dispatch( deleteDepartamento(departamentoId) )
    }
}

// Update Departamento
export const updateDepartamentoThunk = (departamento: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingDepartamentos())
        const result = await updateDepartamentoProvider(departamento, getState)        
        if(!result.ok) return dispatch( setDepartamentosError(result.errorMessage) )
        dispatch( updateDepartamento(result.departamento) )
        dispatch( clearCurrentDepartamento() )
    }
}


export const getLideresDepartamentoThunk = (departamentoId: number) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingDepartamentos())
        const result = await getLideresDepartamentoProvider(departamentoId, getState)
        if(!result.ok) return dispatch( setDepartamentosError(result.errorMessage) )
        dispatch( getLideresDepartamento(result.lideres) )
    }
}
        


//  Clean Departamento
export const cleanDepartamentoThunk = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( clearDepartamentos() )
    }
}

export const clearCurrentDepartamentoThunk = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( clearCurrentDepartamento() )
    }
}