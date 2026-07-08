import { Dimensions, StyleSheet } from "react-native";
import { color_list } from "./StyleApps";

const { height } = Dimensions.get("window");

const style_detail = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  backdropTouchable: {
    flex: 1,
  },
  modalContainer: {
    height: height * 0.7, // 70% dari tinggi layar
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 20,
    color: color_list.green,
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginBottom: 30,
    lineHeight: 24,
  },
  priceContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
    color: color_list.orange,
  },
  priceDesc: {
    fontSize: 14,
    color: "gray",
  },
  subscribeButton: {
    backgroundColor: color_list.orange,
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
  },
  subscribeButtonText: {
    color: color_list.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    padding: 16,
    alignItems: "center",
  },
  backButtonText: {
    color: color_list.green,
    fontSize: 16,
  },
});

export { style_detail };
