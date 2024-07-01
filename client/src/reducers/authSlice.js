import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getuser } from "../api/api";

export const fetchUserDetails = createAsyncThunk(
    "auth/fetchUserDetails",
    async (_, thunkAPI) => {
        try {
            const response = await getuser();
            return response.data.currentUser;
        } catch (err) {
            console.log("Error getting user detail", err);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
        status: 'idle',
        error: null
    },
    reducers: {
        userLogin: (state, action) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentUser = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
})

export const { userLogin } = authSlice.actions;
export default authSlice.reducer;