import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// GANTI IMPORT DARI EXPO-MAPS KE REACT-NATIVE-MAPS
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function Index() {
  // Anda bisa mengganti ini menjadi <LatihanMaps /> jika ingin melihat peta
  return <LatihanMaps />;
}

const LatihanMaps = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Izin ditolak", "Aplikasi membutuhkan akses lokasi");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;
      // Mengatur wilayah pandang peta berdasarkan lokasi user
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01, // Semakin kecil nilainya, semakin zoom-in
        longitudeDelta: 0.01,
      });
    }
  }, [location]);

  if (!region) {
    return (
      <View style={styles.center}>
        <Text>Memuat Lokasi & Peta...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE} // Memaksa Android/iOS menggunakan Google Maps jika diinginkan
        region={region}
        showsUserLocation={true}
        showsCompass={true}
      >
        {/* Menampilkan Marker Berdasarkan Array markersAddress */}
        {markersAddress.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinates}
            title={marker.title}
            pinColor={marker.pinColor}
          />
        ))}
      </MapView>
    </View>
  );
};

// Data Koordinat Marker Rumah Anda
const markersAddress = [
  {
    coordinates: {
      latitude: -6.225269782390106,
      longitude: 106.64972115217128,
    },
    title: "Home",
    pinColor: "red",
  },
];

const LatihanLocation = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Izin ditolak", "Aplikasi membutuhkan akses lokasi");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);

      // Reverse geocoding untuk mendapatkan alamat dari koordinat
      let addressData = await Location.reverseGeocodeAsync({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });

      if (addressData.length > 0) {
        setAddress(addressData[0]);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <Text
        style={{
          padding: 10,
          backgroundColor: "brown",
          color: "white",
          marginBottom: 10,
        }}
      >
        Result Location: {JSON.stringify(location)}
      </Text>
      <Text style={styles.textData}>Latitude: {location?.latitude}</Text>
      <Text style={styles.textData}>Longitude: {location?.longitude}</Text>

      {address && (
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginTop: 15,
              marginBottom: 5,
            }}
          >
            Alamat:
          </Text>
          <Text style={styles.textData}>
            Kota: {address.city || address.subregion || "Tidak tersedia"}
          </Text>
          <Text style={styles.textData}>
            Provinsi: {address.region || "Tidak tersedia"}
          </Text>
          <Text style={styles.textData}>
            Negara: {address.country || "Tidak tersedia"}
          </Text>
          <Text style={styles.textData}>
            Kode Pos: {address.postalCode || "Tidak tersedia"}
          </Text>
          <Text style={styles.textData}>
            Jalan: {address.street || "Tidak tersedia"}
          </Text>
          <Text
            style={{ marginTop: 10, fontStyle: "italic", fontWeight: "bold" }}
          >
            Alamat Lengkap: {address.name || address.street}, {address.city},{" "}
            {address.region}, {address.country}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textData: {
    fontSize: 15,
    marginVertical: 2,
  },
});
