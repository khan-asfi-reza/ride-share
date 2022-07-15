import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import tw from "@lib/tailwind";
import MapAutocomplete from "@components/MapAutocomplete";
import {useDispatch} from "react-redux";
import {setDestination} from "@slices/navSlice";

function NavigateCard() {

    const dispatch = useDispatch()
    const [query, setQuery] = useState('')

    const onLocationClick = (data) => {
        dispatch(setDestination({
            location: data.geometry.coordinates
        }))
    }

    const resetDestination = () => {
        dispatch(setDestination(null))
    }

    return (
        <SafeAreaView style={tw`flex-1 bg-gray-100`}>
            <Text style={tw`text-center py-4 text-xl text-regular`}>
                Welcome to Ride Share
            </Text>
            <View>
                <MapAutocomplete placeholder={"To where?"}
                                 onPressCancel={resetDestination}
                                 query={query}
                                 setQuery={setQuery}
                                 onLocationClick={onLocationClick}/>
            </View>
        </SafeAreaView>
    );
}

export default NavigateCard;
