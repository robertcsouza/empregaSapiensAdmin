import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/api'



export const loadAnalytics = createAsyncThunk(
    'company/analytics',
    async () => {
        
        const token = sessionStorage.getItem('token');
        const result = await api.get('/v1/company/analytics', {
            headers: {
                'Authorization': `${token}`
            }
        })

        

        return result.data;



    }
)




export const slice = createSlice({
    name: 'company/analytics',
    initialState: {},
    reducers: {
        getAnalytics(state, { payload }) {

            return { ...state, analytics: payload }
        }
    },
    extraReducers: {


        [loadAnalytics.pending]: (state, action) => {
            state.status = 'loading'
        },

        [loadAnalytics.fulfilled]: (state, { payload }) => {
            state.analytics = payload
            state.status = 'sucess'
        },
        [loadAnalytics.rejected]: (state, action) => {
            state.status = 'failed'
        }
        


    }
});

export const { getAnalytics } = slice.actions;

export const analytics = state => state.analytics;

export default slice.reducer;