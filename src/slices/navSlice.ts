import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";

interface NavState {
    origin: any,
    destination: any,
    travelTimeInfo: {
        distance: any,
        duration: any
    },
    userLocation: {
        country: null,
        location: null
    },
}

const initialState: NavState = {
    origin: null,
    destination: null,
    travelTimeInfo: {
        distance: 0,
        duration: '0'
    },
    userLocation: {
        country: null,
        location: null
    },
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
        },
        setUserLocation: (state: Draft<NavState>, action: PayloadAction<any>) => {
            state.userLocation = action.payload;
        }
    }
})

export const {setOrigin, setDestination, setTravelTimeInfo, setUserLocation} = navSlice.actions;

export const selectOrigin = (state: any) => state.nav.origin;
export const selectDestination = (state: any) => state.nav.destination;
export const selectTravelTimeInfo = (state: any) => state.nav.travelTimeInfo;
export const selectUserLocation = (state: any) => state.nav.userLocation;

export default navSlice.reducer;