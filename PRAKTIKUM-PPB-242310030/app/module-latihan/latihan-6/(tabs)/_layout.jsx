import { Drawer } from "expo-router/drawer";
import "react-native-reanimated";

export default function TabLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#49745e",
        drawerInactiveTintColor: "gray",
        drawerStyle: {
          backgroundColor: "#f8f6f1",
          width: 250,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: "#49745e",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Screen 1",
          title: "Screen 1",
        }}
      />
      <Drawer.Screen
        name="screen2"
        options={{
          drawerLabel: "Screen 2",
          title: "Screen 2",
        }}
      />
      <Drawer.Screen
        name="screen3"
        options={{
          drawerLabel: "Screen 3",
          title: "Screen 3",
        }}
      />
    </Drawer>
  );
}

const color_list = {
  orange: "#e8ab30", // Warna orange untuk premium badge
  green: "#49745e", // Warna hijau utama (untuk tab aktif)
  green_light: "#49745e35", // Warna hijau transparan
  cream: "#f8f6f1", // Warna cream untuk background
  white: "#fff", // Warna putih
};
