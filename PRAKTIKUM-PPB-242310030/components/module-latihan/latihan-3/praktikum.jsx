import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';

const Praktikum3Quiz = () => {
  const [biodata, setBiodata] = useState({
    nama: "Anton Sukamto",
    nim: "20200101",
    alamat: "bogor",
    email: "anton@gmail.com",
    nomor_telepon: "0856712283",
  });

  const handleChange = (field, value) => {
    setBiodata(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#b4be85" }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 40,
      }}
    >
      <Image 
        source={require("../../../assets/avatar/ggf-gato-gif-ggf-gato-like.gif")}
        style={styles.img}
      />
      
      <Text style={styles.headers.title}>{biodata.nama}</Text>
      <Text style={styles.headers.subtitle}>{biodata.nim}</Text> 
      <Text style={styles.headers.subtitle}>{biodata.alamat}</Text>  
      <Text style={styles.headers.subtitle}>{biodata.email}</Text>
      <Text style={styles.headers.subtitle}>{biodata.nomor_telepon}</Text>
    
      <View style={styles.identity.container}>

        <View style={styles.identity.card_input}>
          <Text style={styles.identity.title}>Nama</Text>
          <TextInput
            value={biodata.nama}
            onChangeText={(value) => handleChange("nama", value)}
            style={styles.identity.input_text}
          />
        </View>

        <View style={styles.identity.card_input}>
          <Text style={styles.identity.title}>NIM</Text>
          <TextInput
            value={biodata.nim}
            onChangeText={(value) => handleChange("nim", value)}
            style={styles.identity.input_text}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.identity.card_input}>
          <Text style={styles.identity.title}>Alamat</Text>
          <TextInput
            value={biodata.alamat}
            onChangeText={(value) => handleChange("alamat", value)}
            style={styles.identity.input_text}
          />
        </View>

        <View style={styles.identity.card_input}>
          <Text style={styles.identity.title}>Email</Text>
          <TextInput
            value={biodata.email}
            onChangeText={(value) => handleChange("email", value)}
            style={styles.identity.input_text}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.identity.card_input}>
          <Text style={styles.identity.title}>Phone</Text>
          <TextInput
            value={biodata.nomor_telepon}
            onChangeText={(value) => handleChange("nomor_telepon", value)}
            style={styles.identity.input_text}
            keyboardType="phone-pad"
          />
        </View>

      </View>
    
      <View style={{ marginTop: 15 }}>
        <TouchableOpacity style={styles.identity.button}>
          <Text style={styles.identity.button_text}>Save</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  headers: {
    title: {
      fontWeight: "bold",
      fontSize: 40,
    },
    subtitle: {
      fontWeight: "bold",
      fontSize: 20,
      color: "black",
    },
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  identity: {
    container: {
      marginTop: 20,
      width: '100%',
      paddingHorizontal: 20,
    },
    card_input: {
      borderWidth: 1,
      marginTop: 15,
      borderColor: '#ddd',
      padding: 10,
      borderRadius: 8,
    },
    title: {
      fontSize: 12,
      color: 'gray',
    },
    input_text: {
      fontSize: 16,
      color: 'black',
    },
    button: {
      backgroundColor: '#007AFF',
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 8,
    },
    button_text: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center',
    },
  },
});

export default Praktikum3Quiz;
