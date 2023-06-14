import { createSlice } from '@reduxjs/toolkit'
import { AreasState, Paginate } from '@/interfaces';


const initialState: AreasState = {
    areas: [],
    paginate: {
        totalItem: 0,
        totalPages: 0,
        currentPage: 0,
    },
    isLoading: false,
    infoMessage: '',
    error: false,
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
        },
        setAreasError: (state, action) => {
            state.isLoading = false
            state.infoMessage = action.payload
            state.error = true
        },
        getAreas: (state, action) => {
            state.areas = action.payload.areas.rows
            state.paginate = {
                totalItem: action.payload.areas.totalItem,
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
            state.infoMessage = action.payload.message         
        },
        updateArea: (state, action) => {            
            const index = state.areas.findIndex(area => area.id === action.payload.area.id)
            state.areas[index] = action.payload.area
            state.isLoading = false
            state.infoMessage = action.payload.message
        },
        deleteArea: (state, action) => {
            const index = state.areas.findIndex(area => area.id === action.payload)
            state.areas.splice(index, 1)
            state.isLoading = false
            state.infoMessage = 'Área eliminada correctamente' 
        },
        clearAreas: (state) => {
            state.areas = []
            state.isLoading = false
            state.error = false
            state.infoMessage = ''
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