import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/StyleApps";

const CTABook = ({ book }) => {
  return (
    <View style={[styles.new_com_container, styles.shadow]}>
      <View style={{ flexDirection: "row" }}>
        <CTAImage book={book} />
        <View
          style={{
            marginLeft: 15,
            flex: 1,
            flexShrink: 1,
            justifyContent: "space-between",
          }}
        >
          <CTAInfoBook book={book} />
          <ButtonRead />
        </View>
      </View>
    </View>
  );
};

const CTAImage = ({ book }) => {
  return (
    <View style={{ position: "relative" }}>
      <Image
        source={book.img}
        style={[styles.new_book_img, styles.shadow]}
        resizeMode="cover"
      />
      {!book.is_free && (
        <View style={[styles.circle_premium, styles.shadow]}>
          <AntDesign name="crown" size={18} color="black" />
        </View>
      )}
    </View>
  );
};

const CTAInfoBook = ({ book }) => {
  return (
    <View>
      <Text style={styles.new_book_title}>{book.title}</Text>
      <Text style={styles.new_book_text}>by {book.author}</Text>
      <View style={{ marginTop: 10 }}>
        <Text
          style={styles.new_book_text}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {book.sinopsis}
        </Text>
      </View>
    </View>
  );
};

const ButtonRead = ({ book }) => {
  const router = useRouter();
  const handleReadNow = () => {
    router.push("/books/${book.id}");
  };
  return (
    <TouchableOpacity style={styles.btn_read} onPress={handleReadNow}>
      <Text style={styles.btn_read_text}>Read More</Text>
    </TouchableOpacity>
  );
};

export default CTABook;
