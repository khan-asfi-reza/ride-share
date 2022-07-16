import {Provider} from "react-redux";
import {store} from "./store";
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
import LocationProvider from "./src/layout/LocationLayout";
import {KeyboardAvoidingView, Text} from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Ionicons";
import tw from "@lib/tailwind";
import HomeStack from "./src/stacks/HomeStack";
import ProfileStack from "./src/stacks/ProfileStack";

const Tab = createBottomTabNavigator();

export default function App() {
    const [isReady, setIsReady] = useState(false);


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
                    <LocationProvider>
                        <KeyboardAvoidingView
                            style={{flex: 1}}>
                            <Tab.Navigator initialRouteName={"Home"}>
                                <Tab.Screen name={"Home"}
                                            options={{
                                                headerShown: false,
                                                tabBarLabel: (props)=>(
                                                    <Text style={tw.style(`text-regular text-sm`, props.focused ? `text-gray-900` : `text-gray-500`)}>
                                                        Home
                                                    </Text>
                                                ),
                                                tabBarIcon: ({size, focused, color}) => (
                                                    <Icon size={18} name={"home"} style={tw.style(focused ? `text-gray-900` : `text-gray-500`)}/>)

                                            }}
                                            component={HomeStack}
                                />
                                <Tab.Screen name={"Profile"}
                                            options={{
                                                headerShown: false,
                                                tabBarLabel: (props)=>(
                                                    <Text style={tw.style(`text-regular text-sm`, props.focused ? `text-gray-900` : `text-gray-500`)}>
                                                        Profile
                                                    </Text>
                                                ),
                                                tabBarIcon: ({size, focused, color}) => (
                                                    <Icon size={18} name={'person'} style={tw.style(focused ? `text-gray-900` : `text-gray-500`)}/>),


                                            }}
                                            component={ProfileStack}
                                />
                            </Tab.Navigator>
                        </KeyboardAvoidingView>
                    </LocationProvider>
                </SafeAreaProvider>
            </NavigationContainer>
        </Provider>
    );
}

