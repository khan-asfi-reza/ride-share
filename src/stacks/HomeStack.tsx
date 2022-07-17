import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "@screens/HomeScreen";
import MapScreen from "@screens/MapScreen";
import SetShortcutScreen from "@screens/SetShortcutScreen";

const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={"HomeScreen"}
            component={HomeScreen}
            initialParams={{
                rerender: false
            }}
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
        <Stack.Screen
            name={"SetShortcutScreen"}
            component={SetShortcutScreen}
            options={{
                headerShown: false
            }}
        />
    </Stack.Navigator>
)
export default HomeStack;