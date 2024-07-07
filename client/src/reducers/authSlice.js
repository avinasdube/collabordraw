import { createSlice } from "@reduxjs/toolkit";

const getUserDetails = () => {
    return JSON.parse(localStorage.getItem('cbUser')) || null
}

const initialState = {
    currentUser: getUserDetails(),
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            localStorage.setItem('cbUser', JSON.stringify(action.payload))
            state.currentUser = action.payload;
        }
    }
})

export const { userLogin } = authSlice.actions;
export default authSlice.reducer;