import React, {useState} from 'react';
import {Image, SafeAreaView} from "react-native";
import tw from "../lib/tailwind";
import logo from "@assets/logoText.png";
import {useDispatch} from "react-redux";
import NavOptions from "@components/NavOptions";
import {setOrigin} from "@slices/navSlice";
import MapAutocomplete from "@components/MapAutocomplete";
import Shortcuts from "@components/Shortcuts";

function Home() {
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')

    const onLocationClick = (data) => {
        dispatch(setOrigin({
            location: data.geometry.coordinates
        }))
    }


    return (
        <SafeAreaView style={tw`p-8`}>
            <Image source={logo} style={{height: 100, width: 100, resizeMode: 'contain'}}/>
            <MapAutocomplete placeholder={"From where?"}
                             query={query}
                             setQuery={setQuery}
                             onLocationClick={onLocationClick}/>
            <NavOptions query={query}/>
            <Shortcuts/>
        </SafeAreaView>
    );
}


export default Home;

