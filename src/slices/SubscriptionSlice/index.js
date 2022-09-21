import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/api'

export const loadSubscriptions = createAsyncThunk(
  'subscriptions',
  async () => {
    console.log('chamou o subscription spatch')
    const token = sessionStorage.getItem('token');
    const result = await api.get('/v1/student/opportunity/self', {
      headers: {
        'Authorization': `${token}`
      }
    })




    return result.data


  }
)

export const subscriptionNotificationUpdate = createAsyncThunk(
  'subscriptions/notifications/update',
  async (id, thunkApi) => {

    const token = sessionStorage.getItem('token');
    const result = await api.put(`/v1/student/notification/${id}`, {}, {
      headers: {
        'Authorization': `${token}`
      }
    })
    // thunkApi.dispatch(loadSubscriptions());
    // console.log(result.data.percentProfile)


    return result.data


  }
)

export const unSubscribeVaga = createAsyncThunk(
  'subscriptions/delete',
  async (id, thunkApi) => {

    const token = sessionStorage.getItem('token');
    const result = await api.delete(`/v1/student/opportunity/register/${id}`, {
      headers: {
        'Authorization': `${token}`
      }
    })
    thunkApi.dispatch(loadSubscriptions());
    // console.log(result.data.percentProfile)


    return result.data


  }
)




export const slice = createSlice({
  name: 'subscription',
  initialState: {
    subscriptions: null,
  },
  reducers: {
    getProfile(state, { payload }) {

      return { ...state, subscriptions: payload }
    }
  },
  extraReducers: {
    [loadSubscriptions.pending]: (state, action) => {
      state.status = 'loading'
    },

    [loadSubscriptions.fulfilled]: (state, { payload }) => {
      state.subscriptions = payload
      state.status = 'sucess'
    }

  }
});



export const subscriptions = state => state.subscriptions;

export default slice.reducer;