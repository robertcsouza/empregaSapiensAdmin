import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/api'

export const loadSelectedVagas = createAsyncThunk(
  'vagas/selected',
  async () => {

    console.log('chamou o selected vagas')
    const token = sessionStorage.getItem('token');
    const result = await api.get(`/v1/student/opportunity/selected`, {
      headers: {
        'Authorization': `${token}`
      }
    })

    return result.data



  }
)

export const slice = createSlice({
  name: 'vagas/selected',
  initialState: {
    vagasSelected: [],
  },
  reducers: {
    getProfile(state, { payload }) {

      return { ...state, profile: payload }
    }
  },
  extraReducers: {

    [loadSelectedVagas.pending]: (state, action) => {
      state.status = 'loading'
    },

    [loadSelectedVagas.fulfilled]: (state, { payload }) => {
      state.vagasSelected = payload;
      state.status = 'sucess'
    }

  }
});

export const { getVaga } = slice.actions;

export const vagas = state => state.vagas;

export default slice.reducer;