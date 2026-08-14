import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{ 
        headerShown: false,
        drawerActiveBackgroundColor: "transparent",
        drawerInactiveBackgroundColor: "transparent",
        drawerInactiveTintColor: "#E6E8E6",
        drawerActiveTintColor: "#FDCA40",
        drawerHideStatusBarOnOpen: false,
        overlayColor: "transparent",
        drawerStyle: {
          backgroundColor: "#3772FF",
          width: '55%',
          paddingTop: 50
        },
        drawerLabelStyle: {
          fontSize: 18,
        },
        sceneStyle: {
          backgroundColor: "#3772FF",
        }
        }}>
        <Drawer.Screen name="home" options={{ 
          drawerLabel: "Início", 
          drawerIcon: ({ color }) => <Feather name="home" size={20} color={color}/>}}/>

        <Drawer.Screen name="decks" options={{ 
          drawerLabel: "Baralhos",
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="cards-outline" size={20} color={color}/>}}/>

      </Drawer>
      
    </GestureHandlerRootView>
  );
}