import { TouchableOpacity } from "react-native";
import { color_list, styles } from "../styles/StyleApps";

const ButtonPill = ({ children, color = color_list.white, onAction }) => {
  return (
    <TouchableOpacity
      style={[{ ...styles.button, backgroundColor: color }, styles.shadow]}
      onPress={onAction}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
};

const ButtonStarted = ({ children, color = color_list.white, onAction }) => {
  return (
    <TouchableOpacity
      style={[
        { ...styles.buttonStarted, backgroundColor: color },
        styles.shadow,
      ]}
      onPress={onAction}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
};

const ButtonCircle = ({ children, onAction }) => {
  return (
    <TouchableOpacity
      style={[styles.btn_icon, styles.shadow]}
      onPress={onAction}
    >
      {children}
    </TouchableOpacity>
  );
};

export { ButtonCircle, ButtonPill, ButtonStarted };
