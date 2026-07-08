import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../constants/list_books";

export default function Detail() {
  const { id } = useLocalSearchParams();
  const book = ListBook.find((book) => book.id === Number(id));

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Text>ID: {id}</Text>
      {book ? <Text>Title: {book.title}</Text> : <Text>Book not found</Text>}
    </SafeAreaView>
  );
}
