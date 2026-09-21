import { ReactNode } from "react";
import { View } from "react-native";

export function DrawerSceneWrapper({ children }: { children: ReactNode; enableSwipe?: boolean }) {
    return (
        <View style={{ flex: 1, backgroundColor: "#E6E8E6" }}>
            {children}
        </View>
    );
}