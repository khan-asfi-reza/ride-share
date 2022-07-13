import React from 'react';
import {Image, SafeAreaView, Text,} from "react-native";
import tw from "../lib/tailwind";
import logo from "@assets/logoText.png";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// @ts-ignore
import {GOOGLE_MAPS_API_KEY} from "@env";
import {useDispatch} from "react-redux";
import {setDestination, setOrigin} from "@slices/navSlice";

function Home() {
    const dispatch = useDispatch()
    return (
        <SafeAreaView style={tw`p-8`}>
            <Image source={logo} style={{height: 100, width: 100, resizeMode: 'contain'}}/>

            <GooglePlacesAutocomplete
                nearbyPlacesAPI={"GooglePlacesSearch"}
                styles={{
                    container: {
                        flex: 0,
                    },
                    textInput: {
                      fontSize: 18,
                      fontFamily: "poppins"
                    }
                }}
                enablePoweredByContainer={true}
                onPress={(data, details) => {
                    dispatch(setOrigin({
                        location: {
                            lat: 51.5078,
                            lng: -0.083535535223
                        },
                        description: "Location"
                        // setOrigin({location: data.geometry.location, description: data.description})

                    }))
                    dispatch(setDestination(null))
                }}

                fetchDetails={true}
                placeholder={"Where from?"}
                query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: "en"
                }}/>
            <NavOptions/>
        </SafeAreaView>
    );
}

export default Home;

