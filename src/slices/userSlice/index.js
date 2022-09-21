import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/api'

export const login = createAsyncThunk(
    'profile/login',
    async (payload, thunkApi) => {
        try {
            console.log(payload)
            const result = await api.post('/v1/student/login', payload)
            if (!!result.data.token) {
                sessionStorage.setItem('token', `Bearer ${result.data.token}`);
                thunkApi.dispatch(load())
            }


            return result.data
        } catch (error) {
            return { result: "error" }
        }



    }
)

export const load = createAsyncThunk(
    'profile',
    async () => {
        console.log("chamou o load")
        const token = sessionStorage.getItem('token');
        const result = await api.get('/v1/load', {
            headers: {
                'Authorization': `${token}`
            }
        })


        const payload = { ...result.data.data.aluno, "percentProfile": parseInt(result.data.data.percentProfile) }
        return payload



    }
)

export const updateProfile = createAsyncThunk(
    'profile/updated',
    async (profile, thunkApi) => {
        const token = sessionStorage.getItem('token');

        const result = await api.put('/v1/profile/', profile, {
            headers: {
                'Authorization': `${token}`
            }
        })

        console.log(result)

        thunkApi.dispatch(load())
        return result


    }
)

export const updateStudentImage = createAsyncThunk(
    'profile/updated/image',
    async (payload, thunkApi) => {

        try {
            const token = sessionStorage.getItem('token');
            let data = new FormData();
            data.append('cover_image', payload);
            const result = await api.put('/v1/profile/image', data, {
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

export const updateProfessional = createAsyncThunk(

    'profile/professional/updated',
    async (payload, thunkApi) => {
        const token = sessionStorage.getItem('token');
        const { professional, id } = payload;
        const result = await api.put(`/v1/professionals/${id}`, professional, {
            headers: {
                'Authorization': `${token}`
            }
        })

        thunkApi.dispatch(load())
        return result
    }
)

export const createProfessional = createAsyncThunk(
    'profile/professional/create',
    async (professional, thunkApi) => {

        const token = sessionStorage.getItem('token');
        const result = await api.post('/v1/professionals/create/', professional, {
            headers: {
                'Authorization': `${token}`
            }
        })

        thunkApi.dispatch(load())
        return result
    }
)

export const deleteProfessional = createAsyncThunk(
    'profile/professional/delete',
    async (id, thunkApi) => {
        const token = sessionStorage.getItem('token');
        console.log(id)
        const result = await api.delete(`/v1/professionals/${id}`, {
            headers: {
                'Authorization': `${token}`
            }
        })

        thunkApi.dispatch(load())
        return result
    }
)


//Graduation

export const createGraduation = createAsyncThunk(
    'profile/graduation/create',
    async (graduation, thunkApi) => {
        const token = sessionStorage.getItem('token');
        const result = await api.post(`/v1/graduation/create/`, graduation, {
            headers: {
                'Authorization': `${token}`
            }
        })

        thunkApi.dispatch(load())
        return result
    }
)

export const updateGraduation = createAsyncThunk(
    'profile/graduation/updated',
    async (payload, thunkApi) => {
        const token = sessionStorage.getItem('token');
        const { graduation, id } = payload;
        const result = await api.put(`/v1/graduation/${id}`, graduation, {
            headers: {
                'Authorization': `${token}`
            }
        })

        thunkApi.dispatch(load())
        return result
    }
)

export const deleteGraduation = createAsyncThunk(
    'profile/graduation/delete',
    async (id, thunkApi) => {
        const token = sessionStorage.getItem('token');
        const result = await api.delete(`/v1/graduation/${id}`, {
            headers: {
                'Authorization': `${token}`
            }
        })

        thunkApi.dispatch(load())
        return result
    }
)

//Complement

export const createComplement = createAsyncThunk(
    'profile/complement/create',
    async (complement, thunkApi) => {
        const token = sessionStorage.getItem('token');
        const result = await api.post(`/v1/complement/create/`, complement, {
            headers: {
                'Authorization': `${token}`
            }
        })

        thunkApi.dispatch(load())
        return result
    }
)

export const updateComplement = createAsyncThunk(
    'profile/complement/updated',
    async (payload, thunkApi) => {
        const token = sessionStorage.getItem('token');
        const { complement, id } = payload;
        const result = await api.put(`/v1/complement/${id}`, complement, {
            headers: {
                'Authorization': `${token}`
            }
        })

        thunkApi.dispatch(load())
        return result
    }
)

export const deleteComplement = createAsyncThunk(
    'profile/complement/delete',
    async (id, thunkApi) => {
        const token = sessionStorage.getItem('token');
        const result = await api.delete(`/v1/complement/${id}`, {
            headers: {
                'Authorization': `${token}`
            }
        })

        thunkApi.dispatch(load())
        return result
    }
)

//Languages

export const createLanguages = createAsyncThunk(
    'profile/languages/create',
    async (languanges, thunkApi) => {
        const token = sessionStorage.getItem('token');
        const result = await api.post(`/v1/language/create/`, languanges, {
            headers: {
                'Authorization': `${token}`
            }
        })

        thunkApi.dispatch(load())
        return result
    }
)

export const updateLanguages = createAsyncThunk(
    'profile/languages/updated',
    async (payload, thunkApi) => {
        const token = sessionStorage.getItem('token');
        const { language, id } = payload;
        const result = await api.put(`/v1/language/${id}`, language, {
            headers: {
                'Authorization': `${token}`
            }
        })

        thunkApi.dispatch(load())
        return result
    }
)

export const deleteLanguages = createAsyncThunk(
    'profile/languages/delete',
    async (id, thunkApi) => {
        const token = sessionStorage.getItem('token');
        const result = await api.delete(`/v1/language/${id}`, {
            headers: {
                'Authorization': `${token}`
            }
        })

        thunkApi.dispatch(load())
        return result
    }
)

export const slice = createSlice({
    name: 'profile',
    initialState: {
        isLogged: false,
        profile: {
            id: -1,
            ra: 0,
            curso: '',
            about: '',
            nome: '',
            nascimento: '',
            estado_civil: '',
            sexo: '',
            telefone: '',
            residencial: '',
            email: '',
            empregado: 0,
            thumbnail: '',
            linkedin: '',
            facebook: '',
            created_at: '',
            updated_at: '',
            endereco: {
                estado: '',
                cidade: '',
                bairro: '',
                rua: '',
                numero: '',
                cep: '',
                user_id: -1,
                created_at: '',
                updated_at: ''
            },
            professional: [],
            graduation: [],
            complement: [],
            language: [],
            percentProfile: 0
        },
    },
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
            state.profile = payload
            state.status = 'sucess'
        },
        //UPDATE

        [login.rejected]: (state, action) => {
            state.status = 'failed'
        },

        [login.pending]: (state, action) => {
            state.status = 'loading'
        },

        [login.fulfilled]: (state, { payload }) => {
            state.login = payload
            state.status = 'sucess'
        },
        //UPDATE

        [updateProfile.rejected]: (state, action) => {
            state.status = 'failed'
        },

        [updateProfile.pending]: (state, action) => {
            state.status = 'loading'
        },

        [updateProfile.fulfilled]: (state, { payload }) => {
            state.updated = payload
            state.status = 'sucess'
        },
        [updateProfile.rejected]: (state, action) => {
            state.status = 'failed'
        },

        //Update Professional

        [updateProfessional.rejected]: (state, action) => {
            state.status = 'failed'
        },

        [updateProfessional.pending]: (state, action) => {
            state.status = 'loading'
        },

        [updateProfessional.fulfilled]: (state, { payload }) => {
            state.updated = payload
            state.status = 'sucess'
        },

        //Create Professional

        [createProfessional.rejected]: (state, action) => {
            state.status = 'failed'
        },

        [createProfessional.pending]: (state, action) => {
            state.status = 'loading'
        },

        [createProfessional.fulfilled]: (state, { payload }) => {
            state.updated = payload
            state.status = 'sucess'
        },

        //Delete Professional

        [deleteProfessional.rejected]: (state, action) => {
            state.status = 'failed'
        },

        [deleteProfessional.pending]: (state, action) => {
            state.status = 'loading'
        },

        [deleteProfessional.fulfilled]: (state, { payload }) => {
            state.updated = payload
            state.status = 'sucess'
        },

        //Create Professional

        [createGraduation.rejected]: (state, action) => {
            state.status = 'failed'
        },

        [createGraduation.pending]: (state, action) => {
            state.status = 'loading'
        },

        [createGraduation.fulfilled]: (state, { payload }) => {
            state.updated = payload
            state.status = 'sucess'
        },

        //Update  Graduation

        [updateGraduation.rejected]: (state, action) => {
            state.status = 'failed'
        },

        [updateGraduation.pending]: (state, action) => {
            state.status = 'loading'
        },

        [updateGraduation.fulfilled]: (state, { payload }) => {
            state.updated = payload
            state.status = 'sucess'
        },

        //Delete  Graduation

        [deleteGraduation.rejected]: (state, action) => {
            state.status = 'failed'
        },

        [deleteGraduation.pending]: (state, action) => {
            state.status = 'loading'
        },

        [deleteGraduation.fulfilled]: (state, { payload }) => {
            state.updated = payload
            state.status = 'sucess'
        },

        //Create  Complement

        [createComplement.rejected]: (state, action) => {
            state.status = 'failed'
        },

        [createComplement.pending]: (state, action) => {
            state.status = 'loading'
        },

        [createComplement.fulfilled]: (state, { payload }) => {
            state.updated = payload
            state.status = 'sucess'
        },

        //Update  Complement

        [updateComplement.rejected]: (state, action) => {
            state.status = 'failed'
        },

        [updateComplement.pending]: (state, action) => {
            state.status = 'loading'
        },

        [updateComplement.fulfilled]: (state, { payload }) => {
            state.updated = payload
            state.status = 'sucess'
        },

        //Update  Complement

        [deleteComplement.rejected]: (state, action) => {
            state.status = 'failed'
        },

        [deleteComplement.pending]: (state, action) => {
            state.status = 'loading'
        },

        [deleteComplement.fulfilled]: (state, { payload }) => {
            state.updated = payload
            state.status = 'sucess'
        },

        //Create  Languages

        [createLanguages.rejected]: (state, action) => {
            state.status = 'failed'
        },

        [createLanguages.pending]: (state, action) => {
            state.status = 'loading'
        },

        [createLanguages.fulfilled]: (state, { payload }) => {
            state.updated = payload
            state.status = 'sucess'
        },

        //Update  Languages

        [updateLanguages.rejected]: (state, action) => {
            state.status = 'failed'
        },

        [updateLanguages.pending]: (state, action) => {
            state.status = 'loading'
        },

        [updateLanguages.fulfilled]: (state, { payload }) => {
            state.updated = payload
            state.status = 'sucess'
        },

        //Update  Languages

        [deleteLanguages.rejected]: (state, action) => {
            state.status = 'failed'
        },

        [deleteLanguages.pending]: (state, action) => {
            state.status = 'loading'
        },

        [deleteLanguages.fulfilled]: (state, { payload }) => {
            state.updated = payload
            state.status = 'sucess'
        },

        //Update  image

        [updateStudentImage.rejected]: (state, action) => {
            state.status = 'failed'
        },

        [updateStudentImage.pending]: (state, action) => {
            state.status = 'loading'
        },

        [updateStudentImage.fulfilled]: (state, { payload }) => {
            state.updateImage = payload
            state.status = 'sucess'
        },

    }
});

export const { getProfile } = slice.actions;

export const profile = state => state.profile;

export default slice.reducer;