import { createSlice } from '@reduxjs/toolkit'
import { ProfileProps } from '../../../interfaces';


const initialState = {
    isLoading: true,
    updated: false,
    errorMesssage: '',
}

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    checkingProfile: (state) => {
        state.isLoading = true
        state.updated = false
    },
    getProfileError: (state, action) => {
        state.errorMesssage = action.payload
    },
    getProfile: (state, action) => {       
        Object.assign(state, action.payload)
        state.isLoading = false
    },
    // on update profile
    updateProfile: (state, action) => {
        Object.assign(state, action.payload)
        state.isLoading = false
    }
  }
});




export const {getProfile, checkingProfile, getProfileError, updateProfile} = profileSlice.actions

export default profileSlice.reducer