import {Provider} from "react-redux";
import {store} from "./store";
import Home from "@screens/Home";
import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts
} from "@expo-google-fonts/poppins";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-gesture-handler'
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"
import Map from "@screens/Map";

export default function App() {
    const [isReady, setIsReady] = useState(false)
    const Stack = createStackNavigator()

    const [isLoaded] = useFonts({
        'poppins': Poppins_400Regular,
        'poppins-medium': Poppins_500Medium,
        "poppins-semibold": Poppins_600SemiBold,
        "poppins-bold": Poppins_700Bold,
    })

    useEffect(() => {
        // Stop the Splash Screen from being hidden.
        const showSplashScreen = async () => {
            await SplashScreen.preventAutoHideAsync();
        }
        showSplashScreen().then();
    }, []);

    useEffect(() => {
        // Once our data is ready, hide the Splash Screen
        const hideSplashScreen = async () => {
            await SplashScreen.hideAsync();
            await setIsReady(true);
        }
        if (isLoaded) hideSplashScreen().then();
    }, [isReady, isLoaded])

    if (!isReady) return null;


    return (
        <Provider store={store}>
            <NavigationContainer>
                <SafeAreaProvider>
                    <Stack.Navigator>
                        <Stack.Screen
                            name={"Home"}
                            component={Home}
                            options={{
                                headerShown: false
                            }}
                            navigationKey={"home"}/>
                        <Stack.Screen
                            name={"Map"}
                            component={Map}
                            options={{
                                headerShown: false
                            }}
                            navigationKey={"map"}/>
                    </Stack.Navigator>
                </SafeAreaProvider>
            </NavigationContainer>
        </Provider>
    );
}

