import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import car from "@assets/car.png";
import food from "@assets/burger.png";
import tw from "@lib/tailwind";
import Icon from 'react-native-vector-icons/AntDesign';


const data = [
    {
        id: "1",
        title: "Get a ride",
        image: car,
        screen: "",
    },
    {
        id: "2",
        title: "Order Food",
        image: food,
        screen: "",
    }
]

function NavOptions() {

    return (
        <FlatList data={data} horizontal style={tw`w-full`} scrollEnabled={false} keyExtractor={(item) => item.id} renderItem={({item}) => (
            <TouchableOpacity style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-100 m-2 w-36 rounded-md`}>
                <View>
                    <Image source={item.image} style={{height: 80, width: 80, resizeMode: 'contain'}}/>
                    <Text style={tw`text-medium mt-4`}>
                        {item.title}
                    </Text>
                    <Icon style={tw`bg-black mt-4 w-7 h-7 p-2 text-center rounded-full`} color={"white"} name={"arrowright"}/>
                </View>
            </TouchableOpacity>
        )}/>
    );
}

export default NavOptions;