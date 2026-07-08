import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/StyleApps";

const Header = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");

      if (userDataString === null) {
        setUserData({ username: "Discover Books" });
      } else {
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);
      }
    } catch (error) {
      console.warn("Error checking login status:", error);
      setUserData({ username: "Discover Books" });
    }
  };
  const router = useRouter();

  const handlerSearch = () => {
    router.push("/search");
  };
  return (
    <View style={styles.h_container}>
      <View>
        <Text style={styles.sub_title}>Good Morning👋</Text>
        <Text style={styles.title}>{userData?.username || "-"}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity
          style={[styles.btn_icon, styles.shadow]}
          onPress={handlerSearch}
        >
          <Ionicons name="search-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn_icon, styles.shadow]}>
          <Ionicons name="notifications-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
