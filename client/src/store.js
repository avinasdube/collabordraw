import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice.js';

const store = configureStore({
    reducer: {
        auth: authSlice,
    }
})

export default store;