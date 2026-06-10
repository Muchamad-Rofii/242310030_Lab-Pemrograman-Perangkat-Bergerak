import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../src/context/CartContext";
import { formatRupiah } from "../../src/hooks/useCartActions";

function OrderStatusBadge({ status }) {
  return (
    <View className="bg-accent-green rounded-full px-3 py-1">
      <Text className="text-white text-xs font-bold">✓ {status}</Text>
    </View>
  );
}

function OrderHistoryCard({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const orderDate = new Date(order.orderedAt);
  const formattedDate = orderDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = orderDate.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View className="bg-white rounded-2xl mb-3 border border-gray-100 shadow-sm overflow-hidden">
      <TouchableOpacity
        className="p-4"
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.8}
      >
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-secondary font-bold text-sm">{order.orderId}</Text>
          <OrderStatusBadge status={order.status} />
        </View>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-gray-400 text-xs">{formattedDate}</Text>
            <Text className="text-gray-400 text-xs">{formattedTime} WIB</Text>
          </View>
          <View className="items-end">
            <Text className="text-primary font-bold text-lg">{formatRupiah(order.total)}</Text>
            <Text className="text-gray-400 text-xs">{order.items.length} jenis menu</Text>
          </View>
        </View>
        <View className="mt-2 flex-row items-center">
          <Text className="text-gray-400 text-xs flex-1" numberOfLines={1}>
            {order.items.map((i) => `${i.emoji} ${i.name}`).join(", ")}
          </Text>
          <Text className="text-primary text-xs ml-2">{isExpanded ? "▲" : "▼"}</Text>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View className="border-t border-gray-100 px-4 pb-4">
          <Text className="text-secondary font-semibold text-sm mt-3 mb-2">Detail Pesanan:</Text>
          {order.items.map((item) => (
            <View key={item.id} className="flex-row items-center justify-between py-1.5 border-b border-gray-50">
              <View className="flex-row items-center flex-1">
                <Text className="text-lg mr-2">{item.emoji}</Text>
                <Text className="text-secondary text-sm flex-1" numberOfLines={1}>
                  {item.name}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-gray-400 text-sm">x{item.quantity}</Text>
                <Text className="text-secondary font-semibold text-sm min-w-[80px] text-right">
                  {formatRupiah(item.price * item.quantity)}
                </Text>
              </View>
            </View>
          ))}
          <View className="flex-row justify-between mt-3 pt-2 border-t border-canteen-border">
            <Text className="text-secondary font-bold">Total</Text>
            <Text className="text-primary font-bold text-base">{formatRupiah(order.total)}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default function HistoryScreen() {
  const { orderHistory } = useCart();

  if (orderHistory.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-canteen-bg">
        <View className="px-4 pt-4 pb-3">
          <Text className="text-secondary font-bold text-2xl">📋 Riwayat Pesanan</Text>
        </View>
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-6xl mb-4">📭</Text>
          <Text className="text-secondary font-bold text-xl mb-2 text-center">
            Belum Ada Pesanan
          </Text>
          <Text className="text-gray-400 text-sm text-center">
            Riwayat pesananmu akan muncul di sini setelah kamu melakukan pemesanan.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-canteen-bg">
      <View className="px-4 pt-4 pb-3">
        <Text className="text-secondary font-bold text-2xl">📋 Riwayat Pesanan</Text>
        <Text className="text-gray-400 text-sm mt-1">{orderHistory.length} transaksi tercatat</Text>
      </View>

      <FlatList
        data={orderHistory}
        keyExtractor={(order) => order.orderId}
        renderItem={({ item }) => <OrderHistoryCard order={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
