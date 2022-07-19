import {ActivityIndicator, SafeAreaView, Text} from "react-native";
import tw from "@lib/tailwind";
import React from "react";

export default function LoadingScreen() {


    return (
        <SafeAreaView style={tw`justify-center items-center flex-1`}>
            <ActivityIndicator size="large" color="#333"/>
            <Text style={tw`text-center text-lg text-semibold mt-4`}>
                Ride Share
            </Text>
        </SafeAreaView>
    )
}