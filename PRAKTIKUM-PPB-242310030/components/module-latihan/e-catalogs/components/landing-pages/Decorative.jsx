import { View } from "react-native";
import { styles } from "../../styles/StyleLandingPage";

const Decorative = () => {
  return (
    <View style={styles.decorativeContainer}>
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />
    </View>
  );
};

export default Decorative;
