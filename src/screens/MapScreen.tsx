import {Text, View} from "react-native";
import tw from "@lib/tailwind";
import Map from "@components/Map";

function MapScreen() {
    return (
        <View>
            <View style={tw`h-1/2`}>
                <Map/>
            </View>
            <View style={tw`h-1/2`}>

            </View>
        </View>
    );
}

export default MapScreen;