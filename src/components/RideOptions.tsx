import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import tw from "@lib/tailwind";
import Icon from "react-native-vector-icons/FontAwesome5";
import {useNavigation} from "@react-navigation/native";
import Premium from "@assets/premium.png";
import Sedan from "@assets/sedan.png";
import XL from "@assets/xl.png";
import Moto from "@assets/moto.png";
import {useDispatch, useSelector} from "react-redux";
import {selectDestination, selectOrigin, selectTravelTimeInfo, setTravelTimeInfo} from "@slices/navSlice";
import axios from "axios";
import {MAPBOX} from "@env";
import moment from "moment";
import {formatTime} from "@lib/time";

const data = [
    {
        id: "Sedan",
        title: "Sedan",
        multi: 1,
        image: Sedan,
    },
    {
        id: "Premium",
        title: "Premium",
        multi: 1.3,
        image: Premium,
    },
    {
        id: "Moto",
        title: "Moto",
        multi: 0.7,
        image: Moto,
    },
    {
        id: "XL",
        title: "XL",
        multi: 1.5,
        image: XL,
    },
]

function RideOptions() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const travelInfo = useSelector(selectTravelTimeInfo);
    const [distance, setDistance] = useState(null);
    const dispatch = useDispatch();


    const parseCoords = (coords) => {
        console.log(`${coords.location[0]},${coords.location[1]}`)
        return `${coords.location[0]},${coords.location[1]}`
    }

    useEffect(() => {
        const getDistance = async () => {
            axios.get(`https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${parseCoords(origin)};${parseCoords(destination)}?access_token=${MAPBOX}`)
                .then((res) => {
                    dispatch(setTravelTimeInfo({
                        distance: (res.data.trips[0]?.distance  / 1000).toFixed(2),
                        duration: formatTime(res.data.trips[0]?.duration)
                    }))
                })
                .catch((e)=>{
                    console.log(e)
                })
        }

        getDistance()
            .then()
    }, [origin, destination]);


    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <SafeAreaView>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.goBack();
                    }}
                    style={tw`absolute top-4 left-5 p-3 rounded-full z-30`}>
                    <Icon name={"chevron-left"}/>
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl text-medium`}>
                    Select a ride - {travelInfo.distance} KM
                </Text>
            </SafeAreaView>
            <FlatList style={tw`flex-1`} data={data} renderItem={({item: {id, title, multi, image}, item})=>(
                <TouchableOpacity onPress={()=>{
                    setSelected(item)
                }} style={tw.style(`flex-row justify-between items-center px-10`,
                    selected && id === selected.id && `bg-gray-200 rounded-md`
                )}>
                    <View style={tw`flex-row items-center justify-center`}>
                        <Image source={image} style={{width: 100, height: 100, resizeMode: 'contain'}}/>
                        <View>
                            <Text style={tw`text-lg text-medium`}>
                                {title}
                            </Text>
                            <Text>
                                {travelInfo.duration} Travel
                            </Text>

                        </View>
                    </View>
                    <Text style={tw`text-semibold font-semibold text-base`}>
                        BDT {((travelInfo.distance || 1) * 10 * multi).toFixed(1)}
                    </Text>
                </TouchableOpacity>

            )} keyExtractor={(item)=> item.id}/>
            <TouchableOpacity style={tw`bg-black text-white text-regular px-4 py-4`}>
                <Text style={tw`text-center text-white text-regular text-lg`}>
                    Select {selected?.title}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default RideOptions;
