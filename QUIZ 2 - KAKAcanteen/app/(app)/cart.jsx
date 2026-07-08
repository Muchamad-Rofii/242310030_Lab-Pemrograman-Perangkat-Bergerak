import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../src/context/CartContext";
import { formatRupiah } from "../../src/hooks/useCartActions";
import { showConfirm, showAlert } from "../../src/hooks/useDialog";
import { useRouter } from "expo-router";

function CartItemRow({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  function handleRemove() {
    showConfirm({
      title: "Hapus Item",
      message: `Hapus ${item.name} dari keranjang?`,
      confirmText: "Hapus",
      isDanger: true,
      onConfirm: () => removeFromCart(item.id),
    });
  }

  return (
    <View className="bg-white rounded-2xl p-4 mb-3 border border-gray-100 shadow-sm">
      <View className="flex-row items-center">
        <View className="w-14 h-14 rounded-xl bg-canteen-bg items-center justify-center mr-3">
          <Text className="text-3xl">{item.emoji}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-secondary font-bold text-sm" numberOfLines={1}>
            {item.name}
          </Text>
          <Text className="text-primary font-semibold text-sm mt-0.5">
            {formatRupiah(item.price)}
          </Text>
        </View>
        <TouchableOpacity onPress={handleRemove} className="p-2 ml-1">
          <Text className="text-accent-red text-xl">🗑️</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <Text className="text-gray-400 text-sm">Subtotal</Text>
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center bg-canteen-bg rounded-xl border border-canteen-border">
            <TouchableOpacity className="px-3 py-1.5" onPress={() => decreaseQuantity(item.id)}>
              <Text className="text-primary font-bold text-lg">−</Text>
            </TouchableOpacity>
            <Text className="text-secondary font-bold text-base w-7 text-center">
              {item.quantity}
            </Text>
            <TouchableOpacity className="px-3 py-1.5" onPress={() => increaseQuantity(item.id)}>
              <Text className="text-primary font-bold text-lg">+</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-secondary font-bold text-sm min-w-[80px] text-right">
            {formatRupiah(item.price * item.quantity)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function CartScreen() {
  const { cartItems, cartTotal, cartItemCount, confirmOrder, clearCart } = useCart();
  const router = useRouter();
  const [isOrdering, setIsOrdering] = useState(false);

  function handleConfirmOrder() {
    showConfirm({
      title: "Konfirmasi Pesanan",
      message: `Total pembayaran: ${formatRupiah(cartTotal)}\n\nLanjutkan pesanan?`,
      confirmText: "Pesan Sekarang",
      onConfirm: () => {
        setIsOrdering(true);
        confirmOrder();
        setIsOrdering(false);
        showAlert(
          "Pesanan Berhasil! 🎉",
          "Pesananmu sedang diproses. Terima kasih sudah memesan di KAKAcanteen!",
          () => router.push("/(app)/history")
        );
      },
    });
  }

  function handleClearCart() {
    showConfirm({
      title: "Kosongkan Keranjang",
      message: "Yakin ingin menghapus semua item dari keranjang?",
      confirmText: "Hapus Semua",
      isDanger: true,
      onConfirm: clearCart,
    });
  }

  if (cartItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-canteen-bg">
        <View className="px-4 pt-6 pb-3">
          <Text className="text-secondary font-bold text-2xl">🛒 Keranjang</Text>
        </View>
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-7xl mb-6">🛒</Text>
          <Text className="text-secondary font-bold text-2xl mb-2 text-center">
            Keranjang Kosong
          </Text>
          <Text className="text-gray-400 text-sm text-center mb-8">
            Yuk tambahkan menu favoritmu ke keranjang!
          </Text>
          <TouchableOpacity
            className="bg-primary rounded-2xl px-8 py-4"
            onPress={() => router.push("/(app)")}
            activeOpacity={0.85}
          >
            <Text className="text-white font-bold text-base">Lihat Menu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-canteen-bg">
      <View className="flex-row items-center justify-between px-4 pt-6 pb-3">
        <Text className="text-secondary font-bold text-2xl">🛒 Keranjang</Text>
        <TouchableOpacity onPress={handleClearCart}>
          <Text className="text-accent-red text-sm font-semibold">Kosongkan</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItemRow item={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 180 }}
        showsVerticalScrollIndicator={false}
      />

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-canteen-border px-4 pt-4 pb-6 rounded-t-3xl shadow-lg">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-gray-400 text-sm">{cartItemCount} item dipilih</Text>
          <Text className="text-gray-400 text-sm">Total Pembayaran</Text>
        </View>
        <View className="flex-row justify-between items-center mb-4">
          <View />
          <Text className="text-secondary font-bold text-2xl">{formatRupiah(cartTotal)}</Text>
        </View>
        <TouchableOpacity
          className={`rounded-2xl py-4 items-center shadow-md ${isOrdering ? "bg-primary-light" : "bg-primary"}`}
          onPress={handleConfirmOrder}
          disabled={isOrdering}
          activeOpacity={0.85}
        >
          <Text className="text-white font-bold text-lg">🚀 Pesan Sekarang</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
