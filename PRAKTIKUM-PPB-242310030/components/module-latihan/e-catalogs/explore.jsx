import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"; // Import MapView Standar
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonCircle } from "./components/buttons";
import { color_list } from "./styles/StyleApps";

export default function Explore() {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["35%", "50%", "90%"], []);

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const getLocation = async () => {
      try {
        setIsLoadingLocation(true);
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          Alert.alert("Izin ditolak", "Aplikasi membutuhkan akses lokasi");
          return;
        }

        let userLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (!isMounted) return;

        setLocation({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.01, // Zoom level
          longitudeDelta: 0.01,
        });

        let addressData = await Location.reverseGeocodeAsync({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });

        if (isMounted && addressData.length > 0) {
          setAddress(addressData[0]);
        }
      } catch (error) {
        console.error("Location error:", error);
      } finally {
        if (isMounted) setIsLoadingLocation(false);
      }
    };

    getLocation();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={style_explore.container}>
        {/* MAP VIEW COMPONENT */}
        <MapComponent current_location={location} />

        <Header />

        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              opacity={0.5}
              appearsOnIndex={1}
              disappearsOnIndex={0}
            />
          )}
          backgroundStyle={style_explore.bottomSheetBg}
        >
          <BottomSheetScrollView
            contentContainerStyle={style_explore.bottomSheetContent}
          >
            <Text style={style_explore.title}>Explore Store</Text>
            {isLoadingLocation ? (
              <Text style={style_explore.subtitle}>Loading location...</Text>
            ) : (
              <Text style={style_explore.subtitle}>
                {address
                  ? `${address.city || ""}, ${address.region || ""}`
                  : "Location: Set"}
              </Text>
            )}

            <View style={{ marginTop: 20 }}>
              <ListStores />
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

// Sub-komponen Map
const MapComponent = ({ current_location }) => {
  const mapRef = useRef(null);

  return (
    <View style={style_explore.mapContainer}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : null}
        initialRegion={current_location}
        region={current_location}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {markersAddress.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinates}
            title={marker.title}
            pinColor={marker.pinColor === "white" ? "blue" : marker.pinColor} // Marker default tidak dukung 'white' dengan baik
          />
        ))}
      </MapView>
    </View>
  );
};

const Header = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={style_explore.headerContainer} edges={["top"]}>
      <View style={style_explore.headerContent}>
        <ButtonCircle onAction={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </ButtonCircle>
      </View>
    </SafeAreaView>
  );
};

const ListStores = () => {
  const stores = markersAddress.filter((store) => store.title !== "Home");
  return (
    <View>
      {stores.map((store, index) => (
        <View key={index} style={style_explore.shopStore_container}>
          <View style={style_explore.shopStore_container_icon}>
            <AntDesign name="shopping" size={24} color={color_list.green} />
          </View>
          <View>
            <Text
              style={[
                style_explore.shopStore_container_text,
                { fontWeight: "bold" },
              ]}
            >
              {store.title}
            </Text>
            <Text>
              <AntDesign name="star" size={18} color={color_list.orange} /> 4.5
            </Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
              Open · Closes 10.00 pm
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

// Data Markers
const markersAddress = [
  {
    coordinates: { latitude: -6.225269, longitude: 106.649721 },
    title: "Home",
    pinColor: "blue",
  },
  {
    coordinates: { latitude: -6.225269, longitude: 106.657682 },
    title: "The UBM Library",
    pinColor: "red",
  },
  {
    coordinates: { latitude: -6.227336, longitude: 106.670122 },
    title: "Toko Buku NAS",
    pinColor: "red",
  },
  // ... tambahkan marker lainnya
];

const style_explore = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  bottomSheetBg: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    elevation: 5,
  },
  bottomSheetContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: color_list.green,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 5,
  },
  shopStore_container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  shopStore_container_icon: {
    width: 45,
    height: 45,
    backgroundColor: color_list.green_light,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  shopStore_container_text: {
    fontSize: 16,
  },
});
