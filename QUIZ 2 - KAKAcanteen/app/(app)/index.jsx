import { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { canteenMenu, menuCategories } from "../../src/data/menuData";
import { useCart } from "../../src/context/CartContext";
import { formatRupiah } from "../../src/hooks/useCartActions";
import { useAuth } from "../../src/context/AuthContext";
import { useRouter } from "expo-router";

function MenuItemCard({ item }) {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const cartEntry = cartItems.find((c) => c.id === item.id);
  const quantityInCart = cartEntry ? cartEntry.quantity : 0;

  return (
    <View className="bg-white rounded-2xl p-4 mb-3 border border-gray-100 shadow-sm flex-row items-center">
      <View className="w-16 h-16 rounded-xl bg-canteen-bg items-center justify-center mr-4">
        <Text className="text-4xl">{item.emoji}</Text>
      </View>
      <View className="flex-1">
        <View className="flex-row items-center gap-2 mb-0.5">
          <Text className="text-base font-bold text-secondary flex-1" numberOfLines={1}>
            {item.name}
          </Text>
          {item.isPopular && (
            <View className="bg-orange-100 rounded-full px-2 py-0.5">
              <Text className="text-[10px] font-bold text-primary">🔥 Populer</Text>
            </View>
          )}
        </View>
        <Text className="text-xs text-gray-400 mb-2" numberOfLines={2}>
          {item.description}
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-primary font-bold text-base">{formatRupiah(item.price)}</Text>
          {quantityInCart === 0 ? (
            <TouchableOpacity
              className="bg-primary rounded-xl px-4 py-2"
              onPress={() => addToCart(item)}
              activeOpacity={0.85}
            >
              <Text className="text-white font-bold text-sm">+ Tambah</Text>
            </TouchableOpacity>
          ) : (
            <View className="flex-row items-center bg-canteen-bg rounded-xl border border-canteen-border">
              <TouchableOpacity className="px-3 py-2" onPress={() => decreaseQuantity(item.id)}>
                <Text className="text-primary font-bold text-lg">−</Text>
              </TouchableOpacity>
              <Text className="text-secondary font-bold text-base w-6 text-center">
                {quantityInCart}
              </Text>
              <TouchableOpacity className="px-3 py-2" onPress={() => increaseQuantity(item.id)}>
                <Text className="text-primary font-bold text-lg">+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default function MenuScreen() {
  const { user } = useAuth();
  const { cartItemCount, cartTotal } = useCart();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredMenu = useMemo(() => {
    return canteenMenu.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Semua" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  return (
    <SafeAreaView className="flex-1 bg-canteen-bg" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7ED" />

      <View className="bg-canteen-bg px-4 pt-2 pb-4 border-b border-canteen-border">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-1">
            <View className="flex-row items-baseline">
              <Text className="text-2xl font-bold text-secondary">KAKA</Text>
              <Text className="text-2xl font-bold text-primary">canteen</Text>
            </View>
            <View className="flex-row items-center mt-0.5">
              <Text className="text-xs">📍</Text>
              <Text className="text-xs text-gray-400 ml-1">Kantin Utama · Lantai 1</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            {cartItemCount > 0 && (
              <TouchableOpacity
                className="relative"
                onPress={() => router.push("/(app)/cart")}
              >
                <View className="w-10 h-10 bg-primary rounded-xl items-center justify-center">
                  <Text className="text-white text-xl">🛒</Text>
                </View>
                <View className="absolute -top-1 -right-1 bg-accent-red rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
                  <Text className="text-white text-[10px] font-bold">{cartItemCount}</Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => router.push("/(app)/profile")}>
              <View className="w-10 h-10 bg-secondary rounded-xl items-center justify-center">
                <Text className="text-white text-sm font-bold">
                  {(user?.displayName || user?.username || "U").charAt(0).toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-1">
          <Text className="text-sm text-gray-400">{greeting()},</Text>
          <Text className="text-lg font-bold text-secondary">
            {user?.displayName || "Pelanggan"} 👋
          </Text>
          <Text className="text-xs text-gray-400 mt-0.5">Mau pesan apa hari ini?</Text>
        </View>

        <View className="flex-row items-center bg-white rounded-xl border border-gray-200 px-4 mt-3 mb-3">
          <Text className="text-gray-400 mr-2">🔍</Text>
          <TextInput
            className="flex-1 py-3 text-secondary text-sm"
            placeholder="Cari menu favorit kamu..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Text className="text-gray-400 text-base">✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {menuCategories.map((category) => (
            <TouchableOpacity
              key={category}
              className={`mr-2 px-4 py-2 rounded-full border ${
                selectedCategory === category
                  ? "bg-primary border-primary"
                  : "bg-white border-gray-200"
              }`}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.8}
            >
              <Text
                className={`text-sm font-semibold ${
                  selectedCategory === category ? "text-white" : "text-gray-500"
                }`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text className="text-xs text-gray-400 mb-3 font-medium">
            {filteredMenu.length} menu tersedia
          </Text>
        }
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-5xl mb-4">🍽️</Text>
            <Text className="text-secondary font-bold text-lg">Menu tidak ditemukan</Text>
            <Text className="text-gray-400 text-sm mt-1">Coba kata kunci lain</Text>
          </View>
        }
      />

      {cartItemCount > 0 && (
        <TouchableOpacity
          className="absolute bottom-4 left-4 right-4 bg-secondary rounded-2xl px-5 py-4 flex-row items-center justify-between shadow-lg"
          onPress={() => router.push("/(app)/cart")}
          activeOpacity={0.9}
        >
          <View className="flex-row items-center">
            <View className="bg-primary rounded-xl w-8 h-8 items-center justify-center mr-3">
              <Text className="text-white font-bold text-sm">{cartItemCount}</Text>
            </View>
            <Text className="text-white font-semibold">Lihat Keranjang</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-white font-bold text-base">{formatRupiah(cartTotal)}</Text>
            <Text className="text-white ml-2">›</Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
