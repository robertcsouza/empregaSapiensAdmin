import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/api'

export const loadAlerts = createAsyncThunk(
  'alerts',
  async () => {
    
    const token = sessionStorage.getItem('token');
    const result = await api.get('/v1/company/alerts', {
      headers: {
        'Authorization': `${token}`
      }
    });

    /*const result = {
        "status": 200,
        "data": [{id:1,title:"teste vaga com stpes",message:"Você tem uma notificação!",created_at: "2022-04-24T08:33:47.000-04:00",route:"/subscription"},{id:1,title:"Pessoa Desenvolvedora Java Sênior - Card Eficiência",message:"Mensgem recebida!!",created_at: "2022-04-24T08:33:47.000-04:00",route:"/subscription"},{id:1,title:"teste vaga com stpes",message:"Mensgem recebida!!",created_at: "2022-04-24T08:33:47.000-04:00",route:"/subscription"},],  
        "sucess": true
                 }
    return result*/


    return result.data


  }
)



export const deleteAlerts = createAsyncThunk(
  'alerts/delete',
  async (id, thunkApi) => {

    const token = sessionStorage.getItem('token');
    const result = await api.delete(`/v1/alerts/${id}`, {
      headers: {
        'Authorization': `${token}`
      }
    })
    thunkApi.dispatch(loadAlerts());
   


    return result.data


  }
)




export const slice = createSlice({
  name: 'alerts',
  initialState: {
    alerts: [],
  },
  reducers: {
    getProfile(state, { payload }) {

      return { ...state, subscriptions: payload }
    }
  },
  extraReducers: {
    [loadAlerts.pending]: (state, action) => {
      state.status = 'loading'
    },

    [loadAlerts.fulfilled]: (state, { payload }) => {
      state.alerts = payload
      state.status = 'sucess'
    },
    [deleteAlerts.pending]: (state, action) => {
      state.status = 'loading'
    },

    [deleteAlerts.fulfilled]: (state, { payload }) => {
      state.alerts.delete = payload
      state.status = 'sucess'
    }

  }
});



export const alerts = state => state.alerts;

export default slice.reducer;