import { useRouter } from "expo-router";
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { color_list } from "../styles/StyleApps";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ModalWrapper({ children, heightPercentage = 90 }) {
  const router = useRouter();

  if (Platform.OS === "ios") {
    // iOS menggunakan modal native
    return <SafeAreaView style={styles.iosContainer}>{children}</SafeAreaView>;
  }

  // Android menggunakan custom modal dengan height 90%
  return (
    <View style={styles.backdrop}>
      {/* Backdrop - tap to close */}
      <TouchableOpacity
        style={styles.backdropTouchable}
        activeOpacity={1}
        onPress={() => router.back()}
      />

      {/* Modal Content */}
      <SafeAreaView
        style={[
          styles.modalContainer,
          { height: SCREEN_HEIGHT * (heightPercentage / 100) },
        ]}
      >
        {/* Drag Indicator */}
        <View style={styles.dragIndicator} />
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  iosContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  backdropTouchable: {
    flex: 1,
  },
  modalContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: color_list.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: color_list.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexShrink: 1,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    alignSelf: "center",
  },
});
