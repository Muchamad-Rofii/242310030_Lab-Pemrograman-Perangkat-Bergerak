import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LatihanCamera() {
  const personalData = {
    name: "Anton Sukamto",
    nim: "20200101",
    address:
      "Jl. Rangga Gading No.01, Gudang, Kecamatan Bogor Tengah, Kota Bogor",
    email: "anton.sukamto@ibik.ac.id",
    phone_number: "081234567890",
  };

  const my_social_media = ["Instagram", "Facebook", "Twitter", "LinkedIn"];

  const [avatarUri, setAvatarUri] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const handleOpenCamera = async () => {
    if (!permission) {
      const { status } = await requestPermission();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Camera permission is required to take photos",
        );
        return;
      }
    }

    if (!permission.granted) {
      const { status } = await requestPermission();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Camera permission is required to take photos",
        );
        return;
      }
    }

    setIsCameraVisible(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        setAvatarUri(photo.uri);
        setIsCameraVisible(false);
      } catch (error) {
        console.error("Error taking picture:", error);
        Alert.alert("Error", "Failed to take picture");
      }
    }
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Gallery permission is required to select photos",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      "Change Avatar",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: handleOpenCamera,
        },
        {
          text: "Choose from Gallery",
          onPress: pickImageFromGallery,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={isCameraVisible}
        animationType="slide"
        onRequestClose={() => setIsCameraVisible(false)}
      >
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="front"
            mode="picture"
          >
            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsCameraVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>

              <View style={{ width: 80 }} />
            </View>
          </CameraView>
        </View>
      </Modal>

      <TouchableOpacity onPress={showImagePickerOptions}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              avatarUri
                ? { uri: avatarUri }
                : require("../../../assets/avatars/avatar.png")
            }
            style={styles.headers.img_avatar}
            resizeMode="cover"
          />
          <View style={styles.cameraIconOverlay}>
            <FontAwesome name="edit" size={24} color="#fff" />
          </View>
        </View>
      </TouchableOpacity>

      <Text style={styles.headers.title}>{personalData.name}</Text>
      <Text style={styles.headers.subtitle}>{personalData.nim}</Text>

      <View style={styles.identity.container}>
        <View style={styles.identity.card_input}>
          <Text style={styles.identity.title}>Phone</Text>
          <TextInput
            value={personalData.phone_number}
            style={styles.identity.input_text}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.identity.card_input}>
          <Text style={styles.identity.title}>Email</Text>
          <TextInput
            value={personalData.email}
            style={styles.identity.input_text}
          />
        </View>

        <View style={styles.identity.card_input}>
          <Text style={styles.identity.title}>Address</Text>
          <TextInput
            value={personalData.address}
            style={styles.identity.input_text}
          />
        </View>

        <View style={{ marginTop: 15 }}>
          <TouchableOpacity style={styles.identity.button}>
            <Text style={styles.identity.button_text}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text>Follow me</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {my_social_media.map((social_media, index) => (
          <TouchableOpacity
            key={index}
            style={{
              marginRight: 2,
              backgroundColor: "#0e75d08e",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {social_media}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: "relative",
  },
  cameraIconOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0ea6d0",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  headers: {
    title: {
      fontWeight: "bold",
      fontSize: 40,
    },
    subtitle: {
      fontWeight: "bold",
      fontSize: 20,
      color: "#9b9d9f",
    },
    img_avatar: {
      width: 150,
      height: 150,
      borderRadius: 100,
      borderColor: "#0996d7",
      borderWidth: 4,
      padding: 0,
      backgroundColor: "#f2f2f2",
    },
  },
  identity: {
    container: {
      alignSelf: "stretch",
      padding: 10,
      marginTop: 20,
    },
    card_input: {
      borderWidth: 1,
      borderColor: "#9b9d9f",
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginBottom: 10,
    },
    title: {
      color: "#9b9d9f",
      fontSize: 16,
      marginBottom: 0,
    },
    input_text: {
      color: "#000",
      fontSize: 16,
      padding: 0,
    },
    button: {
      alignItems: "center",
      backgroundColor: "#0ea6d0",
      padding: 15,
      borderRadius: 10,
    },
    button_text: {
      fontSize: 18,
      color: "white",
      fontWeight: "bold",
    },
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  cancelButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
