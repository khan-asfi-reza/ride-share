import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "@screens/HomeScreen";
import MapScreen from "@screens/MapScreen";

const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={"HomeScreen"}
            component={HomeScreen}
            options={{
                headerShown: false
            }}
            navigationKey={"homeScreen"}/>
        <Stack.Screen
            name={"MapScreen"}
            component={MapScreen}
            options={{
                headerShown: false
            }}
            navigationKey={"mapScreen"}/>
    </Stack.Navigator>
)
export default HomeStack;