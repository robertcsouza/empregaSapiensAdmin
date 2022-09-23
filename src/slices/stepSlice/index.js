import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/api'

export const loadSteps = createAsyncThunk(
  'steps',
  async (id) => {
    

    const token = sessionStorage.getItem('token');

    const result = await api.get(`/v1/company/opportunity/step/${id}`, {
      headers: {
        'Authorization': `${token}`
      }
    })
    return result.data;
  }
)

export const createSteps = createAsyncThunk(
  'steps/create',
  async ({ vagaId, payload }) => {

    const token = sessionStorage.getItem('token');

    const result = await api.post(`/v1/company/opportunity/step/create/${vagaId}`, payload, {
      headers: {
        'Authorization': `${token}`
      }
    })
    return result.data;
  }
)


export const updateSteps = createAsyncThunk(
  'steps/update',
  async ({ vagaId, payload }) => {


    const token = sessionStorage.getItem('token');

    const result = await api.put(`/v1/company/opportunity/step/${vagaId}`, payload, {
      headers: {
        'Authorization': `${token}`
      }
    })
    return result.data;
  }
)

export const deleteStep = createAsyncThunk(
  'steps/delete',
  async (values, thunkApi) => {

    const { id, vagaId } = values;

    const token = sessionStorage.getItem('token');

    const result = await api.delete(`/v1/company/opportunity/step/${id}`, {
      headers: {
        'Authorization': `${token}`
      }
    })

    //thunkApi.dispatch(loadSteps(vagaId));
    return result.data;
  }
)



export const slice = createSlice({
  name: 'steps',
  initialState: {},
  reducers: {
    async getSteps(state, { payload }) {


      return { ...state, vagas: payload }
    }
  },
  extraReducers: {
    [loadSteps.pending]: (state, action) => {
      state.status = 'loading'
    },

    [loadSteps.fulfilled]: (state, { payload }) => {
      state.steps = payload
      state.status = 'sucess'
    },
    [loadSteps.rejected]: (state, action) => {
      state.status = 'failed'
    },
    [updateSteps.pending]: (state, action) => {
      state.status = 'loading'
    },

    [updateSteps.fulfilled]: (state, { payload }) => {
      state.updateSteps = payload
      state.status = 'sucess'
    },
    [updateSteps.rejected]: (state, action) => {
      state.status = 'failed'
    }
  }
});

export const { getSteps } = slice.actions;

export const steps = state => state.steps;

export default slice.reducer;