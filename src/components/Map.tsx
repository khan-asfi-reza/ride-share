import MapView, {Marker} from "react-native-maps";
import tw from "@lib/tailwind";
import {useSelector} from "react-redux";
import {selectOrigin} from "@slices/navSlice";
import MapboxGL from "@rnmapbox/maps";
// @ts-ignore
import {MAPBOX} from "@env";

MapboxGL.setAccessToken(MAPBOX)

function Map() {
    const origin = useSelector(selectOrigin);

    return (
       <MapboxGL.MapView style={tw`flex-1`}>

       </MapboxGL.MapView>
    );
}

export default Map;