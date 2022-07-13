import MapView, {Marker} from "react-native-maps";
import tw from "@lib/tailwind";
import {useSelector} from "react-redux";
import {selectOrigin} from "@slices/navSlice";
import MapboxGL from "@rnmapbox/maps";
// @ts-ignore
import {MAPBOX} from "@env";
import {View} from "react-native";
import {useEffect, useState} from "react";

MapboxGL.setAccessToken(MAPBOX)

function Map() {
    const origin = useSelector(selectOrigin);
    const defaultStyle = {
        version: 8,
        name: 'Land',
        sources: {
            map: {
                type: 'raster',
                tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                minzoom: 1,
                maxzoom: 19,
            },
        },
        layers: [
            {
                id: 'background',
                type: 'background',
                paint: {
                    'background-color': '#f2efea',
                },
            },
            {
                id: 'map',
                type: 'raster',
                source: 'map',
                paint: {
                    'raster-fade-duration': 100,
                },
            },
        ],
    };
    const [state, setState] = useState({
        coordinates: [-76.706124, 39.268950],
        location:  [-76.706124, 39.268950],
        showUserLocation: true,
        isAndroidPermissionGranted: true,
    });

    useEffect(() => {

    }, []);


    return (
       <View style={tw`flex-1`}>
           <MapboxGL.MapView
               styleJSON={JSON.stringify(defaultStyle)}
               surfaceView={true}
               zoomEnabled={true}
               style={tw`flex-1`}>
               <MapboxGL.Camera zoomLevel={15} centerCoordinate={state.coordinates}/>
               <MapboxGL.PointAnnotation id={"Marker"} coordinate={state.coordinates} />
           </MapboxGL.MapView>

       </View>
    );
}

export default Map;