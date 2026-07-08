import { Text, View } from "react-native";
import { styles } from "../../styles/StyleLandingPage";

const Titles = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Readly+</Text>
      <Text style={styles.subtitle}>Discover · Subscribe · Read Anywhere</Text>
      <Text style={styles.description}>
        Discover thousands of books at your fingertips. Read, explore, and enjoy
        your favorite stories anytime, anywhere.
      </Text>
    </View>
  );
};

export default Titles;
