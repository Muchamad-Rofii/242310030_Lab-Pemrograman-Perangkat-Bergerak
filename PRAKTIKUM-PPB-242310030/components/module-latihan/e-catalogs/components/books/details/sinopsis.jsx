import { StyleSheet, Text, View } from "react-native";
import { color_list } from "../../../styles/StyleApps";

export default function Sinopsis({ book }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>sinopsis</Text>
      <Text style={styles.paragraph}>{book?.sinopsis}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    color: color_list.white,
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "left",
    marginBottom: 10,
  },
  paragraph: {
    color: color_list.cream,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "justify",
  },
});
