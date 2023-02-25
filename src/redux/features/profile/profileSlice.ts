import { createSlice } from '@reduxjs/toolkit'
import { ProfileProps } from '../../../interfaces';


const initialState:ProfileProps = {
    isLoading: false,
    updated: false,
    errorMesssage: '',
    id: 0,
    name: '',
    lastName: '',
    secondLastName: '',
    nick_name: null,
    email: '',
    short_name: '',
    active: 0,
    birth_date: new Date(),
    admission_date: new Date(),
    phone: '',
    profile_description: null,
    google_id: '',
    slug: '',
    social_facebook: null,
    social_linkedin: null,
    social_twitter: null,
    social_instagram: null,
    street: null,
    suburb: null,
    bachelor_degree: null,
    birth_place: null,
    picture: '',
    rol_id: 0,
    position_id: 0,
    department_id: 0,
    town_id: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    responsabilidades: [],
    position: {
        id: 0,
        nombre: '',
        descripcion: '',
        lider_id: 0,
        slug: '',
        area_id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        estatus_id: 0
    },
    department: {
        id: 0,
        nombre: '',
        descripcion: '',
        lider_id: 0,
        slug: '',
        area_id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        estatus_id: 0
    },
    town: null
}

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    checkingProfile: (state) => {
        state.isLoading = true
        state.updated = false
    },
    setProfileError: (state, action) => {
        state.errorMesssage = action.payload
    },
    setProfile: (state, action) => {
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




export const {setProfile, checkingProfile, setProfileError, updateProfile} = profileSlice.actions

export default profileSlice.reducer