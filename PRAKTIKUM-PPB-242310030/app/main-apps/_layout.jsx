import { Entypo, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "react-native";
import "react-native-reanimated";

export default function TabLayout() {
  return (
    <>
      <StatusBar style="auto" barStyle={"dark-content"} hidden={false} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#49745e",
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 2,
            borderTopColor: "#3a5d4a",
            height: 70,
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="direction" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
