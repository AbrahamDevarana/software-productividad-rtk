import { createSlice } from '@reduxjs/toolkit'
import { Paginate } from '@/interfaces';

interface AreasState {
    areas: Area[];
    paginate: Paginate;
    isLoading: boolean;
    error: boolean;
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
    slug: string;
}

const initialState: AreasState = {
    areas: [],
    paginate: {
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
    },
    isLoading: false,
    infoMessage: '',
    error: false,
    updated: false,
    created: false,
    deleted: false,
    currentArea: {
        id: 0,
        nombre: '',
        slug: '',
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
            state.isLoading = false
            state.infoMessage = action.payload
            state.error = true
        },
        getAreas: (state, action) => {
            state.areas = action.payload.areas.rows
            state.paginate = {
                totalItems: action.payload.areas.totalItems,
                totalPages: action.payload.areas.totalPages,
                currentPage: action.payload.areas.currentPage
            }
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
            state.error = false
            state.infoMessage = ''
            state.updated = false
            state.currentArea = initialState.currentArea
        },
        clearCurrentArea: (state) => {
            state.currentArea = initialState.currentArea
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