import {FlatList, Text, TouchableOpacity, View} from "react-native";
import tw from "@lib/tailwind";
import Icon from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";

const favorites = [
    {
        id: '1',
        icon: "home",
        location: "Home",
        destination: "Palo Alto, San Francisco, USA"
    },
    {
        id: '2',
        icon: "briefcase",
        location: "Work",
        destination: "Palo Alto, San Francisco, USA"
    },
]


export default function Shortcuts(){
    const navigation = useNavigation();

    return(
        <FlatList style={tw`mt-4`}
                  data={favorites}
                  keyExtractor={(item)=>item.id}
                  ItemSeparatorComponent={()=>(
                      <View style={tw`h-1 border-t border-gray-200`}/>
                  )}
                  renderItem={({item})=>(
            <TouchableOpacity style={tw`flex-row items-center p-3`}>
                <Icon name={item.icon} style={tw`mr-4 rounded-full bg-gray-300 p-3`} color={"white"} size={17}/>
                <View>
                    <Text style={tw`text-regular text-lg text-gray-600`}>
                        {item.location}
                    </Text>
                    <Text style={tw`text-regular text-sm text-gray-500`}>
                        {item.destination}
                    </Text>
                </View>
            </TouchableOpacity>
        )}/>
    )
}