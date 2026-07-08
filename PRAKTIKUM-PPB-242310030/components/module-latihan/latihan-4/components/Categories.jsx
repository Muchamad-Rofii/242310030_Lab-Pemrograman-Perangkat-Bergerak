import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { color_list } from "../styles/StyleApps";

const Categoriesnav = () => {
  const categories = ["All", "Free", "Premium", "Popular"];
  return (
    <View style={styles.categ_badge_container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={{
            ...styles.categ_badge,
            backgroundColor:
              category === "All" ? color_list.green : color_list.green_light,
          }}
        >
          <Text
            style={{
              color: category === "All" ? color_list.white : "dark",
            }}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  categ_badge_container: { flexDirection: "row", marginTop: 15 },
  categ_badge: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default Categoriesnav;
