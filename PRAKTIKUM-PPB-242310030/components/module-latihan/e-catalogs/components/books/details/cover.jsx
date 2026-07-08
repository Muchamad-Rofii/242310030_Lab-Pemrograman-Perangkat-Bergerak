import AntDesign from "@expo/vector-icons/AntDesign";
import { Image, StyleSheet, Text, View } from "react-native";
import { color_list } from "../../../styles/StyleApps";

export default function Cover({ book }) {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={book?.img} style={styles.img} />
      </View>
      <View style={styles.title_container}>
        <Text style={styles.title}>{book?.title}</Text>
        <Text style={styles.sub_title}>{book?.author}</Text>
      </View>
      <View style={styles.rating_container}>
        <AntDesign name="star" size={20} color={color_list.orange} />
        <Text style={styles.rating_text}>{book?.rating} / 5.0</Text>
      </View>
      {/* <ButtonPill>
        <Text>Read story</Text>
      </ButtonPill> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  imgContainer: {
    borderRadius: 15,
    shadowColor: color_list.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: "transparent",
  },
  img: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 15,
  },
  title_container: {
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 20,
  },
  title: {
    color: color_list.white,
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  sub_title: {
    color: color_list.cream,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  rating_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 0,
  },
  rating_text: {
    color: color_list.white,
    fontSize: 16,
  },
});
