import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const userdataSlice = createSlice({
    name: 'userdata',
    initialState,
    reducers: {
        createUserData: (state, action) => {
            return { ...action.payload };
        },
    },
});

export const { createUserData } = userdataSlice.actions;

export default userdataSlice.reducer;
