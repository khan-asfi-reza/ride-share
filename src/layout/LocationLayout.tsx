import React, {useEffect} from 'react';
import {Text} from 'react-native';
import * as Location from "expo-location";
import {setUserLocation} from "@slices/navSlice";
import {useDispatch} from "react-redux";

function LocationProvider({children}) {
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            const geoAddress = await Location.reverseGeocodeAsync(location.coords);
            dispatch(setUserLocation({
                country: geoAddress[0].isoCountryCode,
                location: location.coords
            }))
        })();
    }, []);

    return (
        <>
            {children}
        </>
    );
}


export default LocationProvider;