import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/api'

export const loadHabilidades = createAsyncThunk(
  'habilidades',
  async (_, thunkApi) => {
    console.log('chamou habilidade')
    const token = sessionStorage.getItem('token');
    const result = await api.get('/v1/student/skill/', {
      headers: {
        'Authorization': `${token}`
      }
    })

    // console.log(result.data.percentProfile)
    thunkApi.dispatch(loadSkills())

    return result.data


  }
)

export const loadSkills = createAsyncThunk(
  'skills',
  async () => {
    console.log('chamou skills')
    const token = sessionStorage.getItem('token');
    const result = await api.get('/v1/student/skills/list', {
      headers: {
        'Authorization': `${token}`
      }
    })

    // console.log(result.data.percentProfile)


    return result.data


  }
)

export const createSkills = createAsyncThunk(
  'skills',
  async (skill, thunkApi) => {
    console.log('create skills')
    const token = sessionStorage.getItem('token');
    const result = await api.post('/v1/student/skills/create/', skill, {
      headers: {
        'Authorization': `${token}`
      }
    })

    return result.data


  }
)

export const salvarHabilidades = createAsyncThunk(
  'habilidades/create',
  async (conhecimento, thunkApi) => {
    const token = sessionStorage.getItem('token');
    const result = await api.post('/v1/student/skill/', conhecimento, {
      headers: {
        'Authorization': `${token}`
      }
    })

    // console.log(result.data.percentProfile)
    thunkApi.dispatch(loadHabilidades());
    console.log(result)
    return result.data


  }
)

export const deleteHabilidade = createAsyncThunk(
  'habilidades/create',
  async (id, thunkApi) => {

    const token = sessionStorage.getItem('token');
    const result = await api.delete(`/v1/student/skill/${id}`, {
      headers: {
        'Authorization': `${token}`
      }
    })
    thunkApi.dispatch(loadHabilidades());
    // console.log(result.data.percentProfile)


    return result.data


  }
)




export const slice = createSlice({
  name: 'habilidades',
  initialState: {
    habilidades: null,
  },
  reducers: {
    getProfile(state, { payload }) {

      return { ...state, subscriptions: payload }
    }
  },
  extraReducers: {
    [loadHabilidades.pending]: (state, action) => {
      state.status = 'loading'
    },

    [loadHabilidades.fulfilled]: (state, { payload }) => {
      state.habilidades = payload
      state.status = 'sucess'
    },
    [loadSkills.pending]: (state, action) => {
      state.status = 'loading'
    },

    [loadSkills.fulfilled]: (state, { payload }) => {
      state.skills = payload
      state.status = 'sucess'
    },

    [salvarHabilidades.pending]: (state, action) => {
      state.status = 'loading'
    },

    [salvarHabilidades.fulfilled]: (state, { payload }) => {
      state.habilidadesCreate = payload
      state.status = 'sucess'
    }
  }
});



export const habilidades = state => state.habilidades;

export default slice.reducer;