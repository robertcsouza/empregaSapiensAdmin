import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/api'

export const loadAnalytics = createAsyncThunk(
  'analytics',
  async () => {

    console.log('chamou o analytics')
    const token = sessionStorage.getItem('token');
    const result = await api.get(`/v1/student/analytics`, {
      headers: {
        'Authorization': `${token}`
      }
    })

    return result.data



  }
)

export const slice = createSlice({
  name: 'analytics',
  initialState: {
    analytics: null,
  },
  reducers: {
    getAnalytics(state, { payload }) {

      return { ...state, profile: payload }
    }
  },
  extraReducers: {

    [loadAnalytics.pending]: (state, action) => {
      state.status = 'loading'
    },

    [loadAnalytics.fulfilled]: (state, { payload }) => {
      state.analytics = payload;
      state.status = 'sucess'
    }

  }
});

export const { getAnalytics } = slice.actions;

export const analytics = state => state.analytics;

export default slice.reducer;