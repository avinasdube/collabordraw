import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice.js';
import roomSlice from './reducers/roomSlice.js';

const store = configureStore({
    reducer: {
        auth: authSlice,
        rooms: roomSlice,
    }
})

export default store;