import {View} from "react-native";
import tw from "@lib/tailwind";
import Map from "@components/Map";
import {createStackNavigator} from "@react-navigation/stack";
import NavigateCard from "@components/NavigateCard";
import RideOptionsCard from "@components/RideOptions"
function MapScreen() {
    const Stack = createStackNavigator();

    return (
        <View>
            <View style={tw`h-1/2`}>
                <Map/>
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen name={"NavigateCard"}
                                  component={NavigateCard}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name={"RideOptionsCard"}
                                  component={RideOptionsCard}
                                  options={{headerShown: false}}/>
                </Stack.Navigator>
            </View>
        </View>
    );
}

export default MapScreen;