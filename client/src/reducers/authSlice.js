import { createSlice } from "@reduxjs/toolkit";

const getCurrentUserDetails = () => {
    return JSON.parse(localStorage.getItem("loggedinUsr")) || false
}

const initialState = {
    currentUser: getCurrentUserDetails(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            localStorage.setItem("loggedinUsr", JSON.stringify(action.payload));
            state.currentUser = action.payload;
        }
    }
})

export const { userLogin } = authSlice.actions;
export default authSlice.reducer;