import { StyleSheet } from "react-native";
import { color_list } from "./StyleApps";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_list.green,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: -50,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: color_list.white,
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 24,
    color: color_list.white,
    opacity: 0.9,
    marginBottom: 20,
    fontWeight: "300",
    letterSpacing: 2,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: color_list.white,
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.85,
    paddingHorizontal: 10,
  },
  decorativeContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  circle: {
    position: "absolute",
    borderRadius: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  circle1: {
    width: 200,
    height: 200,
    top: -50,
    right: -50,
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: 100,
    left: -30,
  },
  circle3: {
    width: 100,
    height: 100,
    top: "40%",
    right: 20,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    minWidth: 200,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: color_list.green,
    letterSpacing: 0.5,
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: color_list.white,
    opacity: 0.7,
  },
});
