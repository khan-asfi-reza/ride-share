import {SafeAreaView, Text, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import tw from "@lib/tailwind";
import Shortcuts from "@components/Shortcuts";
import SetShortcutScreen from "@screens/SetShortcutScreen";
import ProfileScreen from "@screens/ProfileScreen";

const Stack = createStackNavigator();


const ProfileStack = ()=> (
    <Stack.Navigator>
        <Stack.Screen name={"ProfileScreen"}
                      options={{headerShown: false}}
                      component={ProfileScreen}
                      navigationKey={"profileScreen"}
        />
    </Stack.Navigator>
)

export default ProfileStack;