import { color_list } from "@/components/e-catalogs/styles/StyleApps";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../../../../constants/list_books";
import { ButtonPill } from "../../buttons";
import Cover from "./cover";
import Header from "./header";
import Sinopsis from "./sinopsis";

export default function Detail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const book = ListBook.find((book) => book.id === parseInt(id));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      setIsLoggedIn(userDataString !== null);
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsLoggedIn(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleReadBook = async (book_id, is_free) => {
    try {
      // Cek status login
      const userDataString = await AsyncStorage.getItem("userData");

      if (!userDataString) {
        // Jika belum login, tampilkan alert dan redirect ke signin
        Alert.alert(
          "Login Required",
          "Please sign in to read this book",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Sign In",
              onPress: () => router.push("/signin"),
            },
          ],
          { cancelable: true },
        );
        return;
      }

      // Jika sudah login, lanjutkan ke read atau subscribe
      if (is_free) {
        router.push(`/books/read/${book_id}`);
      } else {
        router.push(`/books/subscribe/${book_id}`);
      }
    } catch (error) {
      console.error("Error in handleReadBook:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <ImageBackground source={book?.img} style={styles_detail.background}>
      <StatusBar style="auto" barStyle={"light-content"} />
      {Platform.OS === "ios" ? (
        <BlurView intensity={80} tint="dark" style={styles_detail.overlay} />
      ) : (
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.8)", "rgba(0,0,0,0.9)"]}
          style={styles_detail.overlay}
        />
      )}
      <SafeAreaView style={styles_detail.container}>
        <Header book={book} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Cover book={book} />
          <Sinopsis book={book} />
        </ScrollView>
        <ButtonPill
          color={book.is_free ? color_list.white : color_list.orange}
          onAction={() => handleReadBook(book.id, book.is_free)}
        >
          <View style={styles_detail.button_container}>
            {book.is_free ? (
              <>
                <Feather name="book-open" size={20} color={color_list.green} />
                <Text style={styles_detail.button_text}>Read Book</Text>
              </>
            ) : (
              <>
                <FontAwesome
                  name="credit-card"
                  size={20}
                  color={color_list.white}
                />
                <Text
                  style={{
                    ...styles_detail.button_text,
                    color: color_list.white,
                  }}
                >
                  Subscribe
                </Text>
              </>
            )}
          </View>
        </ButtonPill>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles_detail = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 15 : 25,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayAndroid: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay untuk Android
  },
  button_container: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    alignContent: "center",
  },
  button_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: color_list.green,
  },
});
