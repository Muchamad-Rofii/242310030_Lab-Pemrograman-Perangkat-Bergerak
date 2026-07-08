import React from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';

const Index = () => {
  const biodata = {
    nama: "Anton Sukamto",
    nim: "20200101",
    alamat: "bogor",
    email: "anton@gmail.com",
    nomor_telepon: "0856712283",
  };

  return (
    <View style={styles.container}> 
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
          <Text style={styles.identity.title}>Phone</Text>
          <TextInput
            value={biodata.nomor_telepon}
            style={styles.identity.input_text}
            autoFocus
          />
        </View>
        <View style={styles.identity.card_input}>
        <Text style={styles.identity.title}>Email</Text>
            <TextInput
            value={biodata.email}
            style={styles.identity.input_text}
            autoFocus
        />
        </View>
      </View>
    
    <View style={{ marginTop: 15 }}>
      <TouchableOpacity style={styles.identity.button}>
        <Text style={styles.identity.button_text}>save</Text>
      </TouchableOpacity>
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
  },
});

export default Index;