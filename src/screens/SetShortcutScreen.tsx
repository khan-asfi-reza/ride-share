import {Image, SafeAreaView, Text, TouchableOpacity} from "react-native";
import logo from "@assets/logoText.png";
import MapAutocomplete from "@components/MapAutocomplete";
import React, {useState} from "react";
import tw from "@lib/tailwind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {RouteProp, useRoute} from "@react-navigation/core";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

export type SetShortcutScreenParams = {
    params: {
        action: string,
        shortcut: object,
        returnTo?: string
    }
}

function SetShortcutScreen({showHeader=true, headerComp}: {showHeader?: boolean, headerComp?:any}) {

    const [query, setQuery] = useState('')
    const [location, setLocation] = useState(null);
    const route = useRoute<RouteProp<SetShortcutScreenParams>>();
    const navigation = useNavigation<StackNavigationProp<any>>();

    const onLocationClick = (data) => {
        setLocation(data.geometry.coordinates);
    }

    const {action, shortcut, returnTo} = route.params;

    const onPress = async () => {
        if (query) {
            const newShortcut = {...shortcut, destination: query, coordinates: location, setup: true};
            await AsyncStorage.setItem(action, JSON.stringify(newShortcut))
            navigation.navigate(returnTo || "HomeScreen", {
                rerender: true,
            })
        }
    }


    return (
        <SafeAreaView style={tw`px-4 py-2`}>
            {
                showHeader
                &&
                <Image source={logo} style={{height: 100, width: 100, resizeMode: 'contain'}}/>
            }
            {
                headerComp(action)
            }
            <MapAutocomplete placeholder={action === "Home" ? "Home Location" : "Work Location"}
                             query={query}
                             setQuery={setQuery}
                             onLocationClick={onLocationClick}/>
            <TouchableOpacity onPress={onPress} disabled={!query}
                              style={tw.style(`bg-black mt-8 py-4 px-4`, !query && `opacity-50`)}>
                <Text style={tw`text-regular text-white text-center`}>
                    {action === "Home" ? "Set Home Location" : "Set Work Location"}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default SetShortcutScreen;