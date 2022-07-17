import React, {useCallback, useEffect, useState} from 'react';
import {Image, SafeAreaView} from "react-native";
import tw from "../lib/tailwind";
import logo from "@assets/logoText.png";
import {useDispatch} from "react-redux";
import NavOptions from "@components/NavOptions";
import {setOrigin} from "@slices/navSlice";
import MapAutocomplete from "@components/MapAutocomplete";
import Shortcuts from "@components/Shortcuts";
import {RouteProp, useRoute} from "@react-navigation/core";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

export type HomeStackParamList = {
    Screen: { rerender: boolean };
};

function HomeScreen() {
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')
    const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
    const route = useRoute<RouteProp<HomeStackParamList>>();

    const { rerender } = route.params;


    const onLocationClick = (data) => {
        dispatch(setOrigin({
            location: data.geometry.coordinates
        }))
    }

    useEffect(() => {
        if(rerender){
            setTimeout(()=>{
                navigation.setParams({
                    rerender: false
                })
            }, 10)
        }
    }, [rerender]);



    return (
        <SafeAreaView style={tw`p-8`}>
            <Image source={logo} style={{height: 100, width: 100, resizeMode: 'contain'}}/>
            <MapAutocomplete placeholder={"From where?"}
                             query={query}
                             setQuery={setQuery}
                             onLocationClick={onLocationClick}/>
            <NavOptions query={query}/>
            <Shortcuts rerender={rerender} dispatcher={(coords) => {
                dispatch(setOrigin({location: coords}));
                // @ts-ignore
                navigation.navigate('MapScreen')
            }}/>
        </SafeAreaView>
    );
}


export default HomeScreen;

