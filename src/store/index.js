import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from "slices/userSlice";
import cursoReducer from 'slices/cursoSlice';
import vagaReducer from 'slices/vagaSlice';
import stepReducer from 'slices/stepSlice';
import analyticsReducer from 'slices/analytics';
import notificationSlice from 'slices/notificationSlice';
import alertReducer from 'slices/alertSlice';
import locationReducer from 'slices/locationSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        course: cursoReducer,
        jobs: vagaReducer,
        steps: stepReducer,
        analytics: analyticsReducer,
        notification: notificationSlice,
        alerts: alertReducer,
        location: locationReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
});