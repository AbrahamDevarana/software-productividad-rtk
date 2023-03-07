import { createSlice } from '@reduxjs/toolkit'

interface AreasState {
    areas: Area[];
    isLoading: boolean;
    errorMessage: string;
    infoMessage: string;
    updated: boolean;
    created: boolean;
    deleted: boolean;
    currentArea: Area;
}

interface Area {
    id: number;
    nombre: string;
    parentId: number | null;
}


const initialState: AreasState = {
    areas: [],
    isLoading: false,
    errorMessage: '',
    infoMessage: '',
    updated: false,
    created: false,
    deleted: false,
    currentArea: {
        id: 0,
        nombre: '',
        parentId: null
    }
}

const areasSlice = createSlice({
    name: 'areasSlice',
    initialState,
    reducers: {
        checkingAreas: (state) => {
            state.isLoading = true
            state.updated = false
        },
        setAreasError: (state, action) => {
            state.errorMessage = action.payload
        },
        getAreas: (state, action) => {
            state.areas = action.payload.areas
            state.isLoading = false
        },
        getCurrentArea: (state, action) => {
            state.currentArea = action.payload.area
            state.isLoading = false
        },
        createArea: (state, action) => {
            state.areas.push(action.payload.area)
            state.isLoading = false
            state.created = true
            state.infoMessage = action.payload.message         
        },
        updateArea: (state, action) => {            
            const index = state.areas.findIndex(area => area.id === action.payload.area.id)
            state.areas[index] = action.payload.area
            state.isLoading = false
            state.updated = true
            state.infoMessage = action.payload.message
        },
        deleteArea: (state, action) => {
            const index = state.areas.findIndex(area => area.id === action.payload)
            state.areas.splice(index, 1)
            state.isLoading = false
            state.deleted = true
            state.infoMessage = 'Área eliminada correctamente' 
        },
        clearAreas: (state) => {
            state.areas = []
            state.isLoading = false
            state.errorMessage = ''
            state.infoMessage = ''
            state.updated = false
            state.currentArea = {
                id: 0,
                nombre: '',
                parentId: null
            }
        },
        clearCurrentArea: (state) => {
            state.currentArea = {
                id: 0,
                nombre: '',
                parentId: null
            }
        }
    }
})

export const {
    checkingAreas,
    setAreasError,
    getAreas,
    getCurrentArea,
    createArea,
    updateArea,
    deleteArea,
    clearAreas,
    clearCurrentArea
} = areasSlice.actions

export default areasSlice.reducer