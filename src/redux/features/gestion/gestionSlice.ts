import { GestionState } from '@/interfaces'
import { createSlice } from '@reduxjs/toolkit'


const initialState: GestionState = {
    error: false,
    infoMessage: '',
    isLoading: false,
}