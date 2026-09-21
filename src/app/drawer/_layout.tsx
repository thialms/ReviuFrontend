import BottomNav from "@/components/BottomNav";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#E6E8E6" }}>
      <Stack screenOptions={{ headerShown: false }} />
      <BottomNav />
    </View>
  );
}