import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../src/context/AuthContext";
import { showAlert } from "../../src/hooks/useDialog";

export default function LoginScreen() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ username: "", password: "" });

  function validateFields() {
    const errors = { username: "", password: "" };
    if (!username.trim()) errors.username = "Username tidak boleh kosong";
    if (!password.trim()) errors.password = "Password tidak boleh kosong";
    setFieldErrors(errors);
    return !errors.username && !errors.password;
  }

  async function handleLogin() {
    if (!validateFields()) return;
    setIsLoading(true);
    try {
      await login(username.trim(), password);
    } catch (error) {
      showAlert("Login Gagal", error.message || "Username atau password salah.");
    } finally {
      setIsLoading(false);
    }
  }

  function fillDemoCredentials() {
    setUsername("mhdrf");
    setPassword("123");
    setFieldErrors({ username: "", password: "" });
  }

  return (
    <SafeAreaView className="flex-1 bg-canteen-bg">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6 py-8">
            <View className="items-center mb-10">
              <View className="w-24 h-24 rounded-3xl bg-primary items-center justify-center mb-5 shadow-lg">
                <Text className="text-5xl">🍽️</Text>
              </View>
              <View className="flex-row items-baseline">
                <Text className="text-4xl font-bold text-secondary">KAKA</Text>
                <Text className="text-4xl font-bold text-primary">canteen</Text>
              </View>
              <Text className="text-sm text-gray-400 mt-2 text-center">
                Pesan makanan favoritmu dengan mudah & cepat
              </Text>
            </View>

            <View className="bg-white rounded-3xl p-6 shadow-md border border-canteen-border">
              <Text className="text-xl font-bold text-secondary mb-1">Masuk ke Akun</Text>
              <Text className="text-xs text-gray-400 mb-6">Selamat datang kembali! 👋</Text>

              <View className="mb-4">
                <Text className="text-sm font-semibold text-secondary mb-2">Username</Text>
                <View className={`flex-row items-center bg-surface-muted rounded-xl border ${fieldErrors.username ? "border-accent-red" : "border-gray-200"} px-4`}>
                  <Text className="text-lg mr-3">👤</Text>
                  <TextInput
                    className="flex-1 py-4 text-secondary text-base"
                    placeholder="Masukkan username"
                    placeholderTextColor="#94a3b8"
                    value={username}
                    onChangeText={(val) => {
                      setUsername(val);
                      setFieldErrors((prev) => ({ ...prev, username: "" }));
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                {fieldErrors.username ? (
                  <Text className="text-accent-red text-xs mt-1 ml-1">{fieldErrors.username}</Text>
                ) : null}
              </View>

              <View className="mb-6">
                <Text className="text-sm font-semibold text-secondary mb-2">Password</Text>
                <View className={`flex-row items-center bg-surface-muted rounded-xl border ${fieldErrors.password ? "border-accent-red" : "border-gray-200"} px-4`}>
                  <Text className="text-lg mr-3">🔒</Text>
                  <TextInput
                    className="flex-1 py-4 text-secondary text-base"
                    placeholder="Masukkan password"
                    placeholderTextColor="#94a3b8"
                    value={password}
                    onChangeText={(val) => {
                      setPassword(val);
                      setFieldErrors((prev) => ({ ...prev, password: "" }));
                    }}
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <Text className="text-lg">{isPasswordVisible ? "🙈" : "👁️"}</Text>
                  </TouchableOpacity>
                </View>
                {fieldErrors.password ? (
                  <Text className="text-accent-red text-xs mt-1 ml-1">{fieldErrors.password}</Text>
                ) : null}
              </View>

              <TouchableOpacity
                className={`rounded-2xl py-4 items-center shadow-sm ${isLoading ? "bg-primary-light" : "bg-primary"}`}
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.85}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white font-bold text-base">Masuk Sekarang</Text>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="mt-4 bg-white border border-canteen-border rounded-2xl py-4 px-6 flex-row items-center justify-center"
              onPress={fillDemoCredentials}
              activeOpacity={0.8}
            >
              <Text className="text-xl mr-3">⚡</Text>
              <View>
                <Text className="text-secondary font-semibold text-sm">Isi Akun Demo</Text>
                <Text className="text-gray-400 text-xs">mhdrf / 123</Text>
              </View>
            </TouchableOpacity>

            <Text className="text-center text-gray-300 text-xs mt-6">
              KAKAcanteen v1.0.0 · Autentikasi Lokal
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
