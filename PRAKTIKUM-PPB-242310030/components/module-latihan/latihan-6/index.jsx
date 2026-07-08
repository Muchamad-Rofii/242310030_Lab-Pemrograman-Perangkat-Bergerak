import { Link, useRouter } from "expo-router";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Latihan6() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.container}>
        <Text style={styles.title}>First Screen</Text>
        <Link href={"/module-latihan/latihan-6/screen2"} push asChild>
          <Button title="Go to second screen" />
        </Link>
        <Button
          title="Go to thrid screen"
          onPress={() => router.push("/module-latihan/latihan-6/screen3")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});