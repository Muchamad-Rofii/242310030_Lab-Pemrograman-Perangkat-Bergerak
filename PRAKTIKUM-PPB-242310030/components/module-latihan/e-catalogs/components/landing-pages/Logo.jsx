import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { color_list } from "../../styles/StyleApps";
import { styles } from "../../styles/StyleLandingPage";

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <View style={styles.iconCircle}>
        <Ionicons name="book" size={60} color={color_list.white} />
      </View>
    </View>
  );
};

export default Logo;
