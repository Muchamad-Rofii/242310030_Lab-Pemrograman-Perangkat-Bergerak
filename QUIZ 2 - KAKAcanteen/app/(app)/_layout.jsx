import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { useCart } from "../../src/context/CartContext";

function TabIcon({ emoji, label, focused }) {
  return (
    <View className="items-center justify-center pt-1">
      <Text className={`text-2xl ${focused ? "opacity-100" : "opacity-50"}`}>{emoji}</Text>
      <Text className={`text-xs mt-0.5 font-semibold ${focused ? "text-primary" : "text-gray-400"}`}>
        {label}
      </Text>
    </View>
  );
}

function CartTabIcon({ focused }) {
  const { cartItemCount } = useCart();
  return (
    <View className="items-center justify-center pt-1">
      <View className="relative">
        <Text className={`text-2xl ${focused ? "opacity-100" : "opacity-50"}`}>🛒</Text>
        {cartItemCount > 0 && (
          <View className="absolute -top-1 -right-2 bg-accent-red rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
            <Text className="text-white text-[10px] font-bold">
              {cartItemCount > 99 ? "99+" : cartItemCount}
            </Text>
          </View>
        )}
      </View>
      <Text className={`text-xs mt-0.5 font-semibold ${focused ? "text-primary" : "text-gray-400"}`}>
        Keranjang
      </Text>
    </View>
  );
}

export default function AppTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#FED7AA",
          height: 72,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" label="Menu" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => <CartTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="📋" label="Riwayat" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" label="Profil" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
