import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";

interface User{
    user: null
}

const initialState: User = {
    user: null
}

const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            setUser: (state: Draft<User>, action: PayloadAction<any>)=>{
                state.user = action.payload;
            }
        }
    }
)

export const selectUser = (state) => state.user.user

export const { setUser } = userSlice.actions;

export default userSlice.reducer;