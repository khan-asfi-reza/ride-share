import React from 'react';
import {Image, SafeAreaView,} from "react-native";
import tw from "../lib/tailwind";
import logo from "@assets/logoText.png";
import NavOptions from "../components/NavOptions";

function Home() {
    return (
        <SafeAreaView style={tw`p-8`}>
            <Image source={logo} style={{height: 100, width: 100, resizeMode: 'contain'}}/>
            <NavOptions/>
        </SafeAreaView>
    );
}

export default Home;

