import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import tw from "@lib/tailwind";
import MapAutocomplete from "@components/MapAutocomplete";
import {useDispatch} from "react-redux";
import {setDestination} from "@slices/navSlice";
import Shortcuts from "@components/Shortcuts";
import Icon from "react-native-vector-icons/FontAwesome5";
import {useNavigation} from "@react-navigation/native";
import RideOptions from "@components/RideOptions";

function NavigateCard() {

    const dispatch = useDispatch()
    const [query, setQuery] = useState('')

    const onLocationClick = (data) => {
        dispatch(setDestination({
            location: data.geometry.coordinates
        }))
    }

    const navigate = useNavigation();

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
                <Shortcuts/>
            </View>
            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-200`}>
                <TouchableOpacity
                onPress={()=>{
                    // @ts-ignore
                    navigate.navigate('RideOptionsCard')
                }}
                style={tw`flex flex-row justify-between bg-black w-24 px-4 py-2 rounded-full`}
                >
                    <Icon name={"car"} size={16} color={"white"}/>
                    <Text style={tw`text-white text-center text-regular`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={tw`flex flex-row justify-between w-24 px-4 py-2 rounded-full`}
                >
                    <Icon name={"helicopter"} size={16} color={"black"}/>
                    <Text style={tw`text-center text-regular`}>Heli</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default NavigateCard;
