import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

type Route = "/drawer/home" | "/drawer/decks" | "/drawer/friends";

const items = [
  { id: "home", type: "home", route: "/drawer/home" as Route },
  { id: "cards", type: "cards", route: "/drawer/decks" as Route },
  { id: "stats", type: "stats", route: "/drawer/friends" as Route },
  { id: "settings", type: "settings" },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
        {items.map((item) => {
          const isActive = item.route === pathname;

          return (
            <Pressable
              key={item.id}
              style={[styles.item, isActive && styles.activeItem]}
              onPress={() => item.route && router.push(item.route)}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive, disabled: !item.route }}
            >
              {item.type === "home" && (
                <Feather name="home" size={30} color={isActive ? "#3772FF" : "#3F3F3F"} />
              )}

              {item.type === "cards" && (
                <MaterialCommunityIcons
                  name="cards-outline"
                  size={30}
                  color={isActive ? "#3772FF" : "#3F3F3F"}
                />
              )}

              {item.type === "stats" && (
                <Feather name="users" size={30} color={isActive ? "#3772FF" : "#3F3F3F"} />
              )}

              {item.type === "settings" && (
                <Feather name="settings" size={30} color={isActive ? "#3772FF" : "#3F3F3F"} />
              )}
            </Pressable>
          );
        })}
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#E6E8E6",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  item: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    transform: [{ translateY: -4 }],
  },
  activeItem: {
    backgroundColor: "transparent",
  },
});