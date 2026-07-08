import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function BookList() {
  const [books, setBooks] = useState([
    { id: 1, title: "Pemrograman Web", author: "Febri Damatraseta", rate: 4, view: 120 },
    { id: 2, title: "React JS Dasar", author: "Ahmad Saepudin", rate: 5, view: 89 },
    { id: 3, title: "Next.js Modern", author: "Siti Nurhaliza", rate: 3, view: 45 },
    { id: 4, title: "Tailwind CSS", author: "Budi Santoso", rate: 4, view: 200 },
  ]);

  const [search, setSearch] = useState("");
  const [subscribed, setSubscribed] = useState({});

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubscribe = (id) => {
    setSubscribed((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderStars = (rate) => "★".repeat(rate) + "☆".repeat(5 - rate);

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      {/* Nomor + Title */}
      <View style={styles.cardHeader}>
        <View style={styles.numberBadge}>
          <Text style={styles.numberText}>{index + 1}</Text>
        </View>
        <View style={styles.cardTitleGroup}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.bookAuthor}>{item.author}</Text>
        </View>
      </View>

      {/* Rate & View + Subscribe */}
      <View style={styles.cardFooter}>
        <View style={styles.metaRow}>
          <Text style={styles.stars}>{renderStars(item.rate)}</Text>
          <Text style={styles.metaSeparator}>  |  </Text>
          <Text style={styles.viewIcon}>👁 </Text>
          <Text style={styles.viewCount}>{item.view}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.subscribeBtn,
            subscribed[item.id] && styles.subscribedBtn,
          ]}
          onPress={() => handleSubscribe(item.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.subscribeBtnText}>
            {subscribed[item.id] ? "Subscribed ✓" : "Subscribe"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Belajar State Management</Text>
        <Text style={styles.headerSubtitle}>List of Books</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* List */}
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tidak ada buku yang ditemukan.</Text>
          </View>
        }
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Menampilkan {filteredBooks.length} dari {books.length} buku
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  // Header
  header: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#BFDBFE",
    marginTop: 2,
  },

  // Search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
    padding: 0,
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  // Card
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  numberText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2563EB",
  },
  cardTitleGroup: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  bookAuthor: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  // Footer card
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    fontSize: 13,
    color: "#F59E0B",
    letterSpacing: 1,
  },
  metaSeparator: {
    color: "#D1D5DB",
    fontSize: 13,
  },
  viewIcon: {
    fontSize: 12,
  },
  viewCount: {
    fontSize: 13,
    color: "#6B7280",
  },

  // Subscribe button
  subscribeBtn: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  subscribedBtn: {
    backgroundColor: "#22C55E",
  },
  subscribeBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  // Empty
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: "#9CA3AF",
  },

  // Footer
  footer: {
    backgroundColor: "#F9FAFB",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 13,
    color: "#6B7280",
  },
});
