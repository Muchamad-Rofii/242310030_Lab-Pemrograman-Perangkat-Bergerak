import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { color_list } from "../../../styles/StyleApps";
import { ButtonCircle } from "../../buttons";

export default function Header({ book }) {
  const router = useRouter();
  const [is_love, setIsLove] = useState(false);
  const handleReadNow = () => {
    router.back();
  };
  return (
    <View style={styles_header.container}>
      <ButtonCircle onAction={handleReadNow}>
        <Ionicons name="arrow-back" size={24} color={color_list.green} />
      </ButtonCircle>
      <View style={styles_header.container_icon}>
        <ButtonCircle onAction={() => setIsLove(!is_love)}>
          <AntDesign
            name="heart"
            size={24}
            color={is_love ? "red" : color_list.green_light}
          />
        </ButtonCircle>
        <ButtonCircle>
          <AntDesign name="share-alt" size={24} color={color_list.green} />
        </ButtonCircle>
      </View>
    </View>
  );
}

const styles_header = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 0 : 20,
    marginBottom: Platform.OS === "ios" ? 10 : 20,
  },
  container_icon: {
    flexDirection: "row",
    gap: 10,
  },
});
