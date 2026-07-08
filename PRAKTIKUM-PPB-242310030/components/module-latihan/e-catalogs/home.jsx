import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../constants/list_books";
import BookCollectioins from "./components/BookCollectioins";
import Categoriesnav from "./components/Categories";
import CTABook from "./components/CTABook";
import Header from "./components/Header";
import { styles } from "./styles/StyleApps";

export default function HomeScreen() {
  const lastBook = ListBook[ListBook.length - 1];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* HEADER */}
      <Header />
      {/* END HEADER */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* MAIN CONTENT */}
        <View style={{ flex: 1 }}>
          <CTABook book={lastBook} />
          <Categoriesnav />
          <BookCollectioins books={ListBook} show_total={true} />
        </View>
        {/* MAIN CONTENT */}
      </ScrollView>
    </SafeAreaView>
  );
}
