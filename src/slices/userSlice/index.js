import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/api'
import FormData from 'form-data';

export const requestReset = createAsyncThunk(
    'companys/questReset',
    async (email, thunkApi) => {

        try {

            const result = await api.post('/v1/password/reset', { email })
            return result.data
        } catch (error) {
            return { result: error }
        }



    }
)

export const resetPassword = createAsyncThunk(
    'companys/restPassword',
    async (payload, thunkApi) => {
        try {

            const result = await api.post('/v1/password/new', payload)
            return result.data
        } catch (error) {
            return { result: error }
        }



    }
)

export const adminCreateuser = createAsyncThunk(
    'admin/createUser',
    async (payload, thunkApi) => {
        const token = sessionStorage.getItem('token');

        const result = await api.post('/v1/admin/create/user', payload, {
            headers: {
                'Authorization': `${token}`
            }
        })



        return result.data


    }
)

export const login = createAsyncThunk(
    'companys/login',
    async (payload, thunkApi) => {
        try {

            const result = await api.post('/v1/company/login', payload)



            if (!!result.data.token) {
                sessionStorage.setItem('token', `Bearer ${result.data.token}`);
                // thunkApi.dispatch(load())
            }


            return result.data
        } catch (error) {
            return { result: error }
        }



    }
)


export const slice = createSlice({
    name: 'company',
    initialState: {},
    reducers: {
        getProfile(state, { payload }) {

            return { ...state, profile: payload }
        }
    },
    extraReducers: {


        [login.pending]: (state, action) => {
            state.status = 'loading'
        },

        [login.fulfilled]: (state, { payload }) => {
            state.updated = payload
            state.status = 'sucess'
        },
        [login.rejected]: (state, action) => {
            state.status = 'failed'
        },

        [adminCreateuser.pending]: (state, action) => {
            state.status = 'loading'
        },

        [adminCreateuser.fulfilled]: (state, { payload }) => {
            state.adminCreateuser = payload
            state.status = 'sucess'
        },
        [adminCreateuser.rejected]: (state, action) => {
            state.status = 'failed'
        },

    }
});

export const { getProfile } = slice.actions;

export const profile = state => state.profile;

export default slice.reducer;