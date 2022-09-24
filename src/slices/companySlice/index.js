import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/api'
import FormData from 'form-data';

export const listCompaniesPending = createAsyncThunk(
  'company',
  async (payload, thunkApi) => {
    const token = sessionStorage.getItem('token');

    const result = await api.get('/v1/admin/company/', {
      headers: {
        'Authorization': `${token}`
      }
    })



    return result.data


  }
)


export const aproveCompany = createAsyncThunk(
  'profile/updated',
  async (id, thunkApi) => {

    const token = sessionStorage.getItem('token');

    const result = await api.put(`/v1/admin/aprove/company/${id}`, {}, {
      headers: {
        'Authorization': `${token}`
      }
    })
    thunkApi.dispatch(listCompaniesPending());
    return result.data


  }
)

export const deleteCompany = createAsyncThunk(
  'profile/updated',
  async (id, thunkApi) => {

    const token = sessionStorage.getItem('token');

    const result = await api.delete(`/v1/admin/company/${id}`, {
      headers: {
        'Authorization': `${token}`
      }
    })
    thunkApi.dispatch(listCompaniesPending());
    return result.data
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


    [listCompaniesPending.pending]: (state, action) => {
      state.status = 'loading'
    },

    [listCompaniesPending.fulfilled]: (state, { payload }) => {
      state.listCompaniesPending = payload
      state.status = 'sucess'
    },
    [listCompaniesPending.rejected]: (state, action) => {
      state.status = 'failed'
    },
    [aproveCompany.pending]: (state, action) => {
      state.status = 'loading'
    },

    [aproveCompany.fulfilled]: (state, { payload }) => {
      state.aproveCompany = payload
      state.status = 'sucess'
    },
    [aproveCompany.rejected]: (state, action) => {
      state.status = 'failed'
    },

    [deleteCompany.pending]: (state, action) => {
      state.status = 'loading'
    },

    [deleteCompany.fulfilled]: (state, { payload }) => {
      state.delteCompany = payload
      state.status = 'sucess'
    },
    [deleteCompany.rejected]: (state, action) => {
      state.status = 'failed'
    },

  }
});

export const { getCompanys } = slice.actions;

export const companys = state => state.companys;

export default slice.reducer;