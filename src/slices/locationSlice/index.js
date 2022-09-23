import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const getUf = createAsyncThunk(
  'uf',
  async () => {

    const result = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
    return result.data
  }
)
export const getCity = createAsyncThunk(
  'cidades',
  async (id) => {

    const result = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`)
    return result.data
  }
)



export const slice = createSlice({
  name: 'location/uf',
  initialState: {
    location: null,
  },
  reducers: {
    getLocation(state, { payload }) {

      return { ...state, profile: payload }
    }
  },
  extraReducers: {
    [getUf.pending]: (state, action) => {
      state.status = 'loading'
    },

    [getUf.fulfilled]: (state, { payload }) => {
      state.uf = payload
      state.status = 'sucess'
    },
    [getCity.pending]: (state, action) => {
      state.status = 'loading'
    },

    [getCity.fulfilled]: (state, { payload }) => {
      state.uf = payload
      state.status = 'sucess'
    }


  }
});

export const { getLocation } = slice.actions;

export const location = state => state.location;

export default slice.reducer;