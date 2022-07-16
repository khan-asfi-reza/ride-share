import tw from "@lib/tailwind";
import {useSelector} from "react-redux";
import {selectDestination, selectOrigin} from "@slices/navSlice";
import {TouchableOpacity, View} from "react-native";
import MapboxGL, {MapView} from "@components/Mapbox";
import {useEffect, useRef, useState} from "react";
import {MAPBOX} from "@env";
import MapboxClient from "mapbox"
import Icon from "react-native-vector-icons/AntDesign";
import {useNavigation} from "@react-navigation/native";

function Map() {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const [route, setRoute] = useState(null);
    const mapView = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        const mapboxClient = new MapboxClient(MAPBOX);
        if (destination && origin) {
            const fetchDirections = async () => {
                const originLatLng = {
                    latitude: origin.location[1],
                    longitude: origin.location[0],
                };

                const destLatLng = {
                    latitude: destination.location[1],
                    longitude: destination.location[0],
                };

                const requestOptions = {
                    profile: 'driving',
                    geometry: 'polyline',
                };
                let res = null;
                try {
                    res = await mapboxClient.getDirections([
                        originLatLng,
                        destLatLng,
                    ], requestOptions);
                } catch (e) {
                    console.log(e);
                }

                if (res !== null) {
                    const directions = res.entity.routes[0];
                    mapView.current.fitBounds(destination.location, origin.location, 40, 200)
                    setRoute({directions: directions});
                }
            }
            fetchDirections()
                .then()
        } else {
            setRoute(null);
        }
    }, [destination, origin])

    // const onDragEndOrigin = (e: any) => {
    //     dispatch(setOrigin(
    //         {
    //             location: e.geometry.coordinates
    //         }
    //     ))
    // };


    return (
        <View style={tw`flex-1 relative`}>
            <TouchableOpacity onPress={() => {
                // @ts-ignore
                navigation.navigate('HomeScreen')
            }}
                              style={tw`absolute top-4 left-4 flex z-50 justify-center items-center text-center bg-black w-7 h-7 rounded-full`}>
                <Icon name={"arrowleft"} color={"white"} style={tw`text-center text-lg`}/>
            </TouchableOpacity>
            <MapView
                surfaceView

                userLocationVerticalAlignment={1}
                zoomEnabled={true}
                style={tw`flex-1`}>
                <>
                    <MapboxGL.Camera ref={mapView} zoomLevel={10} centerCoordinate={origin.location}/>
                    <MapboxGL.PointAnnotation id={"Marker"}
                                              title={"Location"}
                        // onDragEnd={onDragEndOrigin}
                                              coordinate={origin.location}/>
                    {
                        destination &&
                        <MapboxGL.PointAnnotation id={"Marker2"}
                                                  coordinate={destination.location}/>
                    }
                    {
                        route &&
                        <MapboxGL.ShapeSource id="routeSource" shape={route.directions.geometry}>
                            <MapboxGL.LineLayer id="routeFill" style={{
                                lineColor: '#415cca',
                                lineWidth: 5,
                                lineOpacity: 0.84,
                            }}/>
                        </MapboxGL.ShapeSource>
                    }
                </>
            </MapView>

        </View>
    );
}

export default Map;