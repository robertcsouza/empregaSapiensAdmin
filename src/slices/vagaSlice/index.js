import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/api'
import { loadSubscriptions } from 'slices/SubscriptionSlice';

export const loadVagas = createAsyncThunk(
  'vagas',
  async (pagination) => {
    console.log("chamou o loadVagas")
    let page = '/?page=1';

    if (!!pagination) {
      page = pagination;
    }

    const token = sessionStorage.getItem('token');
    const result = await api.get(`/v1/student/opportunity${page}`, {
      headers: {
        'Authorization': `${token}`
      }
    })

    return result.data
  }
)


export const searchVagas = createAsyncThunk(
  'vagas',
  async ({ pagination, query }) => {
    let page = '?page=1';
    let search = `query=`
    if (!!query) {
      search = `query=${query}`
    }

    if (!!pagination) {
      page = pagination;
    }

    const token = sessionStorage.getItem('token');
    const result = await api.get(`/v1/student/opportunity/search${page}&${search}`, {
      headers: {
        'Authorization': `${token}`
      }
    })


    return result.data



  }
)


export const candidatarVagas = createAsyncThunk(
  'vagas/candidate',
  async (vagaId, thunkApi) => {

    const token = sessionStorage.getItem('token');
    const result = await api.post(`/v1/student/opportunity/regiter/${vagaId}`, {
      "index": 0
    }, {
      headers: {
        'Authorization': `${token}`
      }
    })

    thunkApi.dispatch(loadVagas())
    thunkApi.dispatch(loadSubscriptions())

    // console.log(result.data.percentProfile)


    return result



  }
)


export const slice = createSlice({
  name: 'vagas',
  initialState: {
    vagas: null,
  },
  reducers: {
    getProfile(state, { payload }) {

      return { ...state, profile: payload }
    }
  },
  extraReducers: {
    [loadVagas.pending]: (state, action) => {
      state.status = 'loading'
    },

    [loadVagas.fulfilled]: (state, { payload }) => {
      state.vagas = payload
      state.status = 'sucess'
    },
    [candidatarVagas.pending]: (state, action) => {
      state.status = 'loading'
    },

    [candidatarVagas.fulfilled]: (state, { payload }) => {
      state.vagasCandidate = payload;
      state.status = 'sucess'
    },
    [searchVagas.pending]: (state, action) => {
      state.status = 'loading'
    },

    [searchVagas.fulfilled]: (state, { payload }) => {
      state.vagas = payload;
      state.status = 'sucess'
    },


  }
});

export const { getVaga } = slice.actions;

export const vagas = state => state.vagas;

export default slice.reducer;