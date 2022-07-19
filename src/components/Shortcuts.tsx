import {FlatList, Text, TouchableOpacity, View} from "react-native";
import tw from "@lib/tailwind";
import Icon from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StackNavigationProp} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {selectOrigin} from "@slices/navSlice";

const favorites = [
    {
        id: '1',
        icon: "home",
        location: "Home",
        destination: "Set Location",
        coordinates: null,
        setup: false
    },
    {
        id: '2',
        icon: "briefcase",
        location: "Work",
        destination: "Set Location",
        coordinates: null,
        setup: false
    },
]

export interface ShortcutProps{
    rerender?: boolean,
    dispatcher?(coordinates): void,
    originEscape?:boolean,
    edit?: boolean,
    onEdit?:Function
}

export default function Shortcuts({rerender, dispatcher, originEscape, edit=false, onEdit}: ShortcutProps){
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [shortcut, setShortcut] = useState([]);
    const origin = useSelector(selectOrigin);

    const getShortcutFromStorage = async (key, replacement) => {
        const shortcut = await AsyncStorage.getItem(key);
        return shortcut || replacement
    }

    const getShortcuts = async () => {
        try {
            const shortcuts = [];
            const home = await getShortcutFromStorage('Home', favorites[0]);
            const office = await getShortcutFromStorage('Work', favorites[1]);
            shortcuts.push(JSON.parse(home), JSON.parse(office));
            setShortcut(shortcuts);
        }
        catch (e) {
            setShortcut(favorites)
        }
    }

    const skipIfOrigin = (item) => {
        if(originEscape){
            return !(origin &&
                item.coordinates &&
                item.coordinates[0] === origin.location[0] &&
                item.coordinates[1] && origin.location[1])
        }
        return true
    }

    useEffect(()=>{
        getShortcuts().then()
    }, [rerender])

    return(
        <FlatList style={tw`mt-4`}
                  data={shortcut}
                  keyExtractor={(item)=>item.id}
                  ItemSeparatorComponent={()=>(
                      <View style={tw`h-1 border-t border-gray-200`}/>
                  )}
                  renderItem={({item})=>(
                      skipIfOrigin(item)
                      &&
                      <TouchableOpacity
                          onPress={()=>{
                              if(edit){
                                  onEdit(
                                      {
                                          action: item.location,
                                          shortcut: item,
                                          returnTo: "EmptyScreen"
                                      }
                                  )
                              }
                              else if(!item.setup){
                                  navigation.navigate('SetShortcutScreen', {
                                      action: item.location,
                                      shortcut: item,
                                  })
                              }else{
                                  if(dispatcher){
                                      dispatcher(item.coordinates)
                                  }
                              }
                          }}
                          style={tw`flex-row items-center p-3`}>
                          <Icon name={item.icon} style={tw`mr-4 rounded-full bg-gray-300 p-3`} color={"white"} size={17}/>
                          <View>
                              <Text style={tw`text-regular text-lg text-gray-600`}>
                                  {item.location}
                              </Text>
                              <Text style={tw`text-regular text-sm text-gray-500`}>
                                  {item.destination}
                              </Text>
                          </View>
                      </TouchableOpacity>
        )}/>
    )
}