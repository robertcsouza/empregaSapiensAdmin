import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadAnalytics } from 'slices/analytics';
import api from '../../service/api'

export const loadVagas = createAsyncThunk(
  'vagas',
  async (page) => {


    const token = sessionStorage.getItem('token');

    const result = await api.get(`/v1/company/opportunity/?page=${page}`, {
      headers: {
        'Authorization': `${token}`
      }
    })
    return result.data;
  }
)

export const getVagasId = createAsyncThunk(
  'vagas/id',
  async () => {
    

    const token = sessionStorage.getItem('token');

    const result = await api.get(`/v1/company/list/opportunity/`, {
      headers: {
        'Authorization': `${token}`
      }
    })
    return result.data;
  }
)

export const getCandidates = createAsyncThunk(
  'vagas/id',
  async (id) => {
    

    const token = sessionStorage.getItem('token');

    const result = await api.get(`/v1/company/opportunity/list/${id}`, {
      headers: {
        'Authorization': `${token}`
      }
    })
    return result.data;
  }
)

export const createVagas = createAsyncThunk(
  'vagas/create',
  async (payload, thunkApi) => {
     
    const token = sessionStorage.getItem('token');

    const result = await api.post('/v1/company/opportunity/create', payload, {
      headers: {
        'Authorization': `${token}`
      }
    })

    thunkApi.dispatch(loadVagas());
    thunkApi.dispatch(loadAnalytics());
    return result.data;
  }
)

export const deleteVagas = createAsyncThunk(
  'vagas/delete',
  async (id, thunkApi) => {
   
    
    const token = sessionStorage.getItem('token');

    const result = await api.delete(`/v1/company/opportunity/${id}`, {
      headers: {
        'Authorization': `${token}`
      }
    })

    thunkApi.dispatch(loadVagas());
    thunkApi.dispatch(loadAnalytics());
    return result.data;
  }
)

export const updateVagas = createAsyncThunk(
  'vagas/delete',
  async (params, thunkApi) => {
    
    const {id,concluido} = params;
    const token = sessionStorage.getItem('token');
    const payload = {concluido:concluido}
    const result = await api.put(`/v1/company/opportunity/${id}`,payload, {
      headers: {
        'Authorization': `${token}`
      }
    })

    thunkApi.dispatch(loadVagas());
    return result.data;
  }
)


export const slice = createSlice({
  name: 'vagas',
  initialState: {},
  reducers: {
    async getVagas(state, { payload }) {


      return { ...state, vagas: payload }
    },
    
  },
  extraReducers: {
    [loadVagas.pending]: (state, action) => {
      state.status = 'loading'
    },

    [loadVagas.fulfilled]: (state, { payload }) => {
      state.vagas = payload
      state.status = 'sucess'
    },
    [loadVagas.rejected]: (state, action) => {
      state.status = 'failed'
    },
    [createVagas.pending]: (state, action) => {
      state.status = 'loading'
    },

    [createVagas.fulfilled]: (state, { payload }) => {
      state.vagas.create = payload
      state.status = 'sucess'
    },
    [createVagas.rejected]: (state, action) => {
      state.status = 'failed'
    },
    
    [getVagasId.pending]: (state, action) => {
      state.status = 'loading'
    },

    [getVagasId.fulfilled]: (state, { payload }) => {
      state.candidates = payload
      state.status = 'sucess'
    },
    [getCandidates.rejected]: (state, action) => {
      state.status = 'failed'
    },
    [getCandidates.pending]: (state, action) => {
      state.status = 'loading'
    },

    [getCandidates.fulfilled]: (state, { payload }) => {
      state.vagasIds = payload
      state.status = 'sucess'
    },
    [getCandidates.rejected]: (state, action) => {
      state.status = 'failed'
    },
    [updateVagas.pending]: (state, action) => {
      state.status = 'loading'
    },

    [updateVagas.fulfilled]: (state, { payload }) => {
      state.updateVagas = payload
      state.status = 'sucess'
    },
    [updateVagas.rejected]: (state, action) => {
      state.status = 'failed'
    },
    [deleteVagas.pending]: (state, action) => {
      state.status = 'loading'
    },

    [deleteVagas.fulfilled]: (state, { payload }) => {
      state.deleteVagas = payload
      state.status = 'sucess'
    },
    [deleteVagas.rejected]: (state, action) => {
      state.status = 'failed'
    },
  }
});

export const { getVagas,getPagination } = slice.actions;

export const vagas = state => state.vagas;

export default slice.reducer;