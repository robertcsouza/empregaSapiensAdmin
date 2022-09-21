import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from 'slices/userSlice';
import vagaReducer from 'slices/vagaSlice';
import subscriptionReducer from 'slices/SubscriptionSlice';
import habilidadesReducer from 'slices/habilidadesSlice';
import selectedVagareducer from 'slices/selectedVagaSlice';
import analyticsReducer from 'slices/analyticsSlice';
import alertReducer from 'slices/alertSlice';


export default configureStore({
    reducer: {
        user: userReducer,
        vagas: vagaReducer,
        subscription: subscriptionReducer,
        habilidades: habilidadesReducer,
        selectedVaga: selectedVagareducer,
        analytics: analyticsReducer,
        alerts:alertReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
});