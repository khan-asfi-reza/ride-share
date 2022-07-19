import {SafeAreaView, Text, View} from "react-native";
import tw from "@lib/tailwind";
import Shortcuts from "@components/Shortcuts";
import SetShortcutScreen from "@screens/SetShortcutScreen";
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Stack = createStackNavigator();

const Empty = () => {
    return(
        <View>
            <Text>

            </Text>
        </View>
    )
}

const ProfileScreen = () => {

    const navigation = useNavigation<StackNavigationProp<any>>()
    const EditHeader = (text) => (
        <Text style={tw`text-medium text-lg my-4`}>
             <Icon size={16} name={"edit"}/> Edit {text} Location
        </Text>
    )
    return (
        <SafeAreaView style={tw`px-4 py-4`}>
            <SafeAreaView style={tw`py-2 border-gray-200 border-b `}>
                <View >
                    <Text style={tw`text-4xl text-medium`}>
                        Khan Asfi Reza
                    </Text>
                    <Text style={tw`my-2 p-2 text-center rounded-full bg-gray-200 w-15`}>
                        5.0 ⭐
                    </Text>
                </View>
                <Shortcuts edit={true} onEdit={(params)=>{
                    navigation.navigate("SetShortcutProfile", params)
                }}/>
            </SafeAreaView>
            <SafeAreaView style={tw`h-1/2`}>

                <Stack.Navigator >
                    <Stack.Screen name={"EmptyScreen"}
                                  options={{headerShown: false}}
                                  component={Empty}/>
                    <Stack.Screen name={"SetShortcutProfile"}
                                  options={{headerShown: false}}

                    >
                        {
                            props => <SetShortcutScreen {...props} showHeader={false} headerComp={EditHeader}/>
                        }
                    </Stack.Screen>
                </Stack.Navigator>
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default ProfileScreen;