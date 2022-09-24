import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from "slices/userSlice";
import companySlice from 'slices/companySlice';


export default configureStore({
    reducer: {
        user: userSlice,
        company: companySlice
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
});