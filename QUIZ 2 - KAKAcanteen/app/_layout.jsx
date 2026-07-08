import "../global.css";
import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { CartProvider } from "../src/context/CartContext";

function RootNavigationGuard() {
  const { isAuthenticated, isLoadingSession } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoadingSession) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/(app)");
    }
  }, [isAuthenticated, isLoadingSession, segments]);

  if (isLoadingSession) {
    return (
      <View className="flex-1 items-center justify-center bg-canteen-bg">
        <ActivityIndicator size="large" color="#F97316" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <RootNavigationGuard />
      </CartProvider>
    </AuthProvider>
  );
}
