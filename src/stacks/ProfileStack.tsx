import {SafeAreaView, Text, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import tw from "@lib/tailwind";

const Stack = createStackNavigator();

const Profile = () => (
    <SafeAreaView style={tw`p-2`}>
        <Text style={tw`text-4xl text-medium`}>
            Khan Asfi Reza
        </Text>
        <Text style={tw`my-2 p-2 text-center rounded-full bg-gray-200 w-15`}>
            5.0 ⭐
        </Text>

    </SafeAreaView>
)
const ProfileStack = ()=> (
    <Stack.Navigator>
        <Stack.Screen name={"ProfileScreen"}
                      options={{headerShown: false}}
                      component={Profile}
                      navigationKey={"profileScreen"}
        />
    </Stack.Navigator>
)

export default ProfileStack;