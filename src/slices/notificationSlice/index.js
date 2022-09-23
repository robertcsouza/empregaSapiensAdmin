import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/api'

export const index = createAsyncThunk(
  'notifications',
  async () => {
    

    const token = sessionStorage.getItem('token');

    const result = await api.get('/company/notification/', {
      headers: {
        'Authorization': `${token}`
      }
    })
    return result.data;
  }
)

export const createNotification = createAsyncThunk(
    'notification/create',
    async ({ payload, thunkApi }) => {
      
      const {title,content,alunoId,vagaId} = payload;
      const token = sessionStorage.getItem('token');
  
      const result = await api.post(`/v1/company/send/notification/${vagaId}`,{title,content,alunoId}, {
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
      state.notification = payload
      state.status = 'sucess'
    },
    [index.rejected]: (state, action) => {
      state.status = 'failed'
    },
  }
});

export const { getNotification } = slice.actions;

export const notification = state => state.notification;

export default slice.reducer;