import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../constants/list_books";
import BookCollectioins from "./components/BookCollectioins";
import PagingComponent from "./components/PagingComponent";
import SearchBar from "./components/SearchBar";
import { styles } from "./styles/StyleApps";

export default function SearchPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState(ListBook);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const BookDataMemori = useMemo(() => {
    let computedData = [...books];

    if (search) {
      computedData = computedData.filter((listData) => {
        return Object.keys(listData).some((key) => {
          try {
            const value = listData[key];
            return (
              value != null &&
              String(value).toLowerCase().includes(search.toLowerCase())
            );
          } catch (error) {
            console.error(`Error processing key "${key}":`, error);
            return false;
          }
        });
      });
    }

    setTotalItems(computedData.length);

    if (computedData.length > 0) {
      return computedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
      );
    } else {
      return [];
    }
  }, [search, books, currentPage]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      {/* <SearchBar value={search} setValue={setSearch} /> */}
      <View style={style_search.searchHeaderContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <SearchBar value={search} setValue={setSearch} />
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <BookCollectioins books={BookDataMemori} />
        {totalItems > 0 && (
          <PagingComponent
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const style_search = StyleSheet.create({
  searchHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
