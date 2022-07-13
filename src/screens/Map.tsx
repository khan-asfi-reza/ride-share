import {Text, View} from "react-native";
// @ts-ignore
import {MAPBOX} from "@env";
import tw from "@lib/tailwind";
import MapboxGL from '@rnmapbox/maps';

MapboxGL.setAccessToken(MAPBOX);

function Map() {
    return (
        <View style={tw`justify-center align-items-center flex-1`}>
            <MapboxGL.MapView style={{flex: 1}} />
        </View>
        );
}

export default Map;