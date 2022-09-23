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



export const getContrato = createAsyncThunk(
    'companys/login',
    async (payload, thunkApi) => {
        try {
            
            const result = await api.get('http://apiempregasapiens.ddns.net:3333/uploads/C:/Users/rober/Desktop/Projeto%20Emprega%20Sapiens/ApiempregaSapiens/tmp/uploads/contratos/cl451321l0002xsuoacytgnqx.pdf')

            return result.data
        } catch (error) {
            return { result: error }
        }



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

export const load = createAsyncThunk(
    'company/profile',
    async () => {
        
        const token = sessionStorage.getItem('token');
        const result = await api.get('/v1/company/profile', {
            headers: {
                'Authorization': `${token}`
            }
        })

        


        return result.data;



    }
)

export const create = createAsyncThunk(
    'companys/login',
    async (payload, thunkApi) => {
        try {

            const result = await api.post('/v1/company/user/create', payload)

            if (!!result.data.token) {
                sessionStorage.setItem('token', `Bearer ${result.data.token}`);

            }

            return result.data
        } catch (error) {
            return { error: "erro ao Cadastrar Empresa" }
        }



    }
)



export const updateCompany = createAsyncThunk(
    'company/updated',
    async (payload, thunkApi) => {

        try {
            const token = sessionStorage.getItem('token');

            const result = await api.put('/v1/company/profile', payload, {
                headers: {
                    'Authorization': `${token}`
                }
            })


            thunkApi.dispatch(load())
            return result;

        } catch (error) {
            return { error: "não foi possivel executar a ação" }
        }


    }
)

export const updateCompanyImage = createAsyncThunk(
    'company/updated/image',
    async (payload, thunkApi) => {

        try {
            const token = sessionStorage.getItem('token');
            let data = new FormData();
            data.append('cover_image', payload);
            const result = await api.put('/v1/company/profile/image', data, {
                headers: {
                    'Authorization': `${token}`,
                    'accept': 'application/json',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })


            thunkApi.dispatch(load())
            return result;

        } catch (error) {
            return { error }
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

        [load.pending]: (state, action) => {
            state.status = 'loading'
        },

        [load.fulfilled]: (state, { payload }) => {
            state.company = payload
            state.status = 'sucess'
        },
        [load.rejected]: (state, action) => {
            state.status = 'failed'
        },
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

        [create.pending]: (state, action) => {
            state.status = 'loading'
        },

        [create.fulfilled]: (state, { payload }) => {
            state.updated = payload
            state.status = 'sucess'
        },
        [updateCompanyImage.rejected]: (state, action) => {
            state.status = 'failed'
        },
        [updateCompanyImage.pending]: (state, action) => {
            state.status = 'loading'
        },

        [updateCompanyImage.fulfilled]: (state, { payload }) => {
            state.updatedImage = payload
            state.status = 'sucess'
        },
        [updateCompanyImage.rejected]: (state, action) => {
            state.status = 'failed'
        },


    }
});

export const { getProfile } = slice.actions;

export const profile = state => state.profile;

export default slice.reducer;