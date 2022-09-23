import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/api'

export const index = createAsyncThunk(
  'courses',
  async () => {
    

    const token = sessionStorage.getItem('token');

    const result = await api.get('/v1/courses', {
      headers: {
        'Authorization': `${token}`
      }
    })
    return result.data;
  }
)


export const slice = createSlice({
  name: 'courses',
  initialState: {},
  reducers: {
    async getCourses(state, { payload }) {


      return { ...state, courses: payload }
    }
  },
  extraReducers: {
    [index.pending]: (state, action) => {
      state.status = 'loading'
    },

    [index.fulfilled]: (state, { payload }) => {
      state.course = payload
      state.status = 'sucess'
    },
    [index.rejected]: (state, action) => {
      state.status = 'failed'
    },
  }
});

export const { getCourses } = slice.actions;

export const courses = state => state.courses;

export default slice.reducer;