import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../../src/context/AuthContext";
import { useCart } from "../../src/context/CartContext";
import { formatRupiah } from "../../src/hooks/useCartActions";
import { showConfirm } from "../../src/hooks/useDialog";

function StatCard({ emoji, value, label }) {
  return (
    <View className="flex-1 bg-white rounded-2xl p-4 items-center border border-gray-100">
      <Text className="text-3xl mb-1">{emoji}</Text>
      <Text className="text-secondary font-bold text-lg" numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      <Text className="text-gray-400 text-xs text-center mt-0.5">{label}</Text>
    </View>
  );
}

function MenuRow({ emoji, label, sublabel, onPress, isDanger }) {
  return (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-2xl px-5 py-4 mb-3 border border-gray-100"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="w-10 h-10 rounded-xl bg-canteen-bg items-center justify-center mr-4">
        <Text className="text-xl">{emoji}</Text>
      </View>
      <View className="flex-1">
        <Text className={`font-semibold text-base ${isDanger ? "text-accent-red" : "text-secondary"}`}>
          {label}
        </Text>
        {sublabel ? <Text className="text-gray-400 text-xs mt-0.5">{sublabel}</Text> : null}
      </View>
      <Text className="text-gray-300 text-lg">›</Text>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { orderHistory, cartItemCount } = useCart();
  const router = useRouter();

  const totalSpent = orderHistory.reduce((sum, order) => sum + order.total, 0);

  function handleLogout() {
    showConfirm({
      title: "Keluar Akun",
      message: "Yakin ingin keluar dari KAKAcanteen?",
      confirmText: "Keluar",
      isDanger: true,
      onConfirm: async () => {
        await logout();
        router.replace("/(auth)/login");
      },
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-canteen-bg">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-6 pb-8">

          <Text className="text-secondary font-bold text-2xl mb-5">👤 Profil Saya</Text>

          <View className="bg-primary rounded-3xl p-6 mb-5 shadow-md">
            <View className="flex-row items-center">
              <View className="w-16 h-16 rounded-2xl bg-white items-center justify-center mr-4">
                <Text className="text-3xl">😊</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-xs opacity-70 mb-1">Pengguna Aktif</Text>
                <Text className="text-white font-bold text-xl">
                  {user?.displayName || user?.username || "Pelanggan"}
                </Text>
                <Text className="text-white text-xs opacity-70 mt-0.5">
                  @{user?.username || "user"}
                </Text>
                <View className="flex-row items-center mt-2">
                  <View className="w-2 h-2 rounded-full bg-accent-green mr-1.5" />
                  <Text className="text-white text-xs opacity-90">Sesi aktif</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="flex-row gap-3 mb-6">
            <StatCard emoji="📋" value={orderHistory.length} label="Pesanan" />
            <StatCard emoji="💰" value={formatRupiah(totalSpent)} label="Total Belanja" />
            <StatCard emoji="🛒" value={cartItemCount} label="Di Keranjang" />
          </View>

          <Text className="text-gray-400 font-bold text-xs mb-3 ml-1 tracking-widest">
            AKUN & PENGATURAN
          </Text>

          <MenuRow
            emoji="📊"
            label="Riwayat Pesanan"
            sublabel={`${orderHistory.length} transaksi`}
            onPress={() => router.push("/(app)/history")}
          />
          <MenuRow
            emoji="🛒"
            label="Keranjang Belanja"
            sublabel={cartItemCount > 0 ? `${cartItemCount} item menunggu` : "Kosong"}
            onPress={() => router.push("/(app)/cart")}
          />
          <MenuRow
            emoji="🔔"
            label="Notifikasi"
            sublabel="Aktif"
            onPress={() => {}}
          />
          <MenuRow
            emoji="❓"
            label="Bantuan & FAQ"
            sublabel="Pusat bantuan KAKAcanteen"
            onPress={() => {}}
          />

          <View className="my-3 border-t border-canteen-border" />

          <MenuRow
            emoji="🚪"
            label="Keluar dari Akun"
            sublabel="Sesi akan diakhiri"
            onPress={handleLogout}
            isDanger
          />

          <Text className="text-center text-gray-300 text-xs mt-6">
            KAKAcanteen v1.0.0 · Made with ❤️ in Indonesia
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
