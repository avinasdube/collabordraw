import { createSlice } from '@reduxjs/toolkit';

const getRoomsList = () => {
    return JSON.parse(localStorage.getItem('roomsList')) || []
}

const initialState = {
    activeRooms: getRoomsList()
}

const roomSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        createRoom: (state, action) => {
            console.log(action.payload)
            let storageRoom;

            if (localStorage.getItem('roomsList') === null) {
                storageRoom = [];
            } else {
                storageRoom = JSON.parse(localStorage.getItem("roomsList"));
            }

            storageRoom.push(action.payload);
            localStorage.setItem("roomsList", JSON.stringify(storageRoom));
            state.activeRooms.push(action.payload)
        }
    }
})

export const { createRoom } = roomSlice.actions;
export default roomSlice.reducer;