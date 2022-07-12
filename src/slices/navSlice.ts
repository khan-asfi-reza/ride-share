import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";

interface NavState {
    origin: any,
    destination: any,
    travelTimeInfo: any
}

const initialState: NavState = {
    origin: null,
    destination: null,
    travelTimeInfo: null
}


const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrigin: (state: Draft<NavState>, action: PayloadAction<any>) => {
            state.origin = action.payload;
        },
        setDestination: (state: Draft<NavState>, action: PayloadAction<any>) => {
            state.destination = action.payload;
        },
        setTravelTimeInfo: (state: Draft<NavState>, action: PayloadAction<any>) => {
            state.travelTimeInfo = action.payload;
        }
    }
})

export const {setOrigin, setDestination, setTravelTimeInfo} = navSlice.actions;

export const selectOrigin = (state: any) => state.nav.origin;
export const selectDestination = (state: any) => state.nav.destination;
export const selectTravelTimeInfo = (state: any) => state.nav.travelTimeInfo;

export default navSlice.reducer;