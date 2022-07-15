import tw from "@lib/tailwind";
import {ScrollView, Text, TextInput, View} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import {selectUserLocation, setOrigin} from "@slices/navSlice";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import {MAPBOX} from "@env";

export default function MapAutocomplete({placeholder, onLocationClick, query, setQuery, extra, onPressCancel}:
{
    placeholder: string,
    onLocationClick(item: any): void,
    query: string,
    setQuery: Function,
    extra?: any,
    onPressCancel?:Function
}){


    const [searchLocation, setSearchLocation] = useState([]);
    const {country, location} = useSelector(selectUserLocation)


    const onChange = async (e) => {
        if(location !== null && country !== ''){
            setQuery(e.nativeEvent.text)
            try{
                const data = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/
            ${query}.json?proximity=${location.longitude},${location.latitude}
            &country=${country}&access_token=${MAPBOX}
            `)
                setSearchLocation(data.data.features || [])
            }
            catch (e){
                console.log(e.response)
            }
        }else{
            alert("Please enable location")
        }
    }
    return(
        <View style={tw`relative`}>
            <TextInput
                value={query}
                underlineColorAndroid="transparent"
                style={tw`h-10 mt-6 py-2 px-4 bg-white text-base no-underline`}
                onChange={onChange}
                placeholder={placeholder}
            />
            <View style={tw`absolute top-6 right-0 flex flex-row`}>
                {
                    extra
                }
                {
                    !!query && <Icon name={"closecircleo"}
                                     style={tw` text-lg p-2 text-center rounded-full `}
                                     onPress={()=>{
                                         setQuery('')
                                         setSearchLocation([])
                                         if(onPressCancel){
                                             onPressCancel()
                                         }

                                     }
                                     }
                                     color={"black"}/>
                }
            </View>
            {
                searchLocation.length > 0 &&
                <ScrollView style={tw`bg-white p-4 w-full border-t border-gray-200 z-10 h-42 overflow-scroll`}>
                    {
                        searchLocation.map((each, id) => (
                            <Text
                                onPress={()=>{
                                    onLocationClick(each)
                                    setQuery(each.place_name)
                                    setSearchLocation([])
                                }}
                                style={tw`text-base my-2 text-gray-600 border-b border-gray-200`}
                                key={id}>
                                {each.place_name}
                            </Text>
                        ))
                    }
                </ScrollView>
            }
        </View>
    )
}