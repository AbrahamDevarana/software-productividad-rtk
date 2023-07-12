import { createSlice } from '@reduxjs/toolkit'
import { AreasState, Paginate } from '@/interfaces';
import { createAreaThunk, deleteAreaThunk, getAreaThunk, getAreasThunk, updateAreaThunk } from './areasThunks';


const initialState: AreasState = {
    areas: [],
    paginate: {
        totalItem: 0,
        totalPages: 0,
        currentPage: 0,
    },
    isLoading: false,
    isLoadingCurrent: false,
    infoMessage: '',
    error: false,
    currentArea: {
        id: 0,
        nombre: '',
        slug: '',
        parentId: null,
        subAreas: [],
        leader: {
            nombre: '',
            apellidoPaterno: '',
            email: '',
            id: '',
            apellidoMaterno: '',
            iniciales: '',
            departamentos: [],
        }
    }
}

const areasSlice = createSlice({
    name: 'areasSlice',
    initialState,
    reducers: {
        clearAreas: (state) => {
            state = initialState
        },
        clearCurrentArea: (state) => {
            state.currentArea = initialState.currentArea
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateAreaThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateAreaThunk.fulfilled, (state, action) => {
                state.areas = state.areas.map(area => area.id === action.payload.id ? action.payload : area)
                state.isLoading = false
            })
            .addCase(updateAreaThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })
            .addCase(createAreaThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createAreaThunk.fulfilled, (state, action) => {
                state.areas = [...state.areas, action.payload]
                state.isLoading = false
            })
            .addCase(createAreaThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })
            .addCase(deleteAreaThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteAreaThunk.fulfilled, (state, action) => {
                state.areas = state.areas.filter(area => area.id !== action.payload.id)
                state.isLoading = false
            })
            .addCase(deleteAreaThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })
            .addCase(getAreaThunk.pending, (state) => {
                state.isLoadingCurrent = true
            })
            .addCase(getAreaThunk.fulfilled, (state, action) => {
                state.currentArea = action.payload
                state.isLoadingCurrent = false
            })
            .addCase(getAreaThunk.rejected, (state, action) => {
                state.isLoadingCurrent = false
                state.error = true
            })
            .addCase(getAreasThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAreasThunk.fulfilled, (state, action) => {
                state.areas = action.payload.rows
                state.paginate = {
                    totalItem: action.payload.totalItem,
                    totalPages: action.payload.totalPages,
                    currentPage: action.payload.currentPage
                }
                state.isLoading = false
            })
            .addCase(getAreasThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })
        }
})

export const {
    clearAreas,
    clearCurrentArea
} = areasSlice.actions

export default areasSlice.reducer