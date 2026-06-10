import { Alert, Platform } from "react-native";

export function showConfirm({ title, message, confirmText = "OK", onConfirm, isDanger = false }) {
  if (Platform.OS === "web") {
    const confirmed = window.confirm(`${title}\n\n${message}`);
    if (confirmed) onConfirm();
  } else {
    Alert.alert(title, message, [
      { text: "Batal", style: "cancel" },
      { text: confirmText, style: isDanger ? "destructive" : "default", onPress: onConfirm },
    ]);
  }
}

export function showAlert(title, message, onDismiss) {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
    if (onDismiss) onDismiss();
  } else {
    Alert.alert(title, message, [{ text: "OK", onPress: onDismiss }]);
  }
}
