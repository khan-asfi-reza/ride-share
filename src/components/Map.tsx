import MapView, {Marker} from "react-native-maps";
import tw from "@lib/tailwind";
import {useSelector} from "react-redux";
import {selectOrigin} from "@slices/navSlice";

function Map() {
    const origin = useSelector(selectOrigin);

    return (
       <MapView
           style={tw`flex-1`}
           initialRegion={{
               latitude: 37.78825,
               longitude: -122.4324,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421,
       }}>
           <Marker
               title={"Origin"}
               description={"Description"}
               identifier={"origin"}
               coordinate={{
               latitude: 37.78825,
               longitude: -122.4324,
           }}/>
       </MapView>
    );
}

export default Map;