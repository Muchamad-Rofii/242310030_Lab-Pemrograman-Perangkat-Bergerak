import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Latihan4() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "column", alignItems: "stretch" }}>
        <View style={{ ...styles.box, backgroundColor: "purple" }}>
          <Text style={styles.text}>Box 1</Text>
        </View>
        <View style={{ ...styles.box, backgroundColor: "green" }}>
          <Text style={styles.text}>Box 2</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 50,
  },
  box: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  section: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

const SampleFlexDirection = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "column-reverse" }}>
        <View style={{ ...styles.box, backgroundColor: "purple" }}>
          <Text style={styles.text}>Box 1</Text>
        </View>
        <View style={{ ...styles.box, backgroundColor: "green" }}>
          <Text style={styles.text}>Box 2</Text>
        </View>
      </View>
    </View>
  );
};

const SampleFlex = () => {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 16 }}>
        Flex 1: Initialize the entire screen
      </Text>
      <View style={{ ...styles.section, flex: 1, backgroundColor: "orange" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Section 1</Text>
        <Text style={{ fontSize: 16 }}>flex: 1 = 1/6</Text>
        <Text style={{ fontSize: 16 }}>Height 16.67% </Text>
      </View>
      <View style={{ ...styles.section, flex: 2, backgroundColor: "green" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Section 1</Text>
        <Text style={{ fontSize: 16 }}>flex: 2 = 2/6</Text>
        <Text style={{ fontSize: 16 }}>Height 33.33% </Text>
      </View>
      <View style={{ ...styles.section, flex: 3, backgroundColor: "pink" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Section 1</Text>
        <Text style={{ fontSize: 16 }}>flex: 3 = 3/6</Text>
        <Text style={{ fontSize: 16 }}>Height 50% </Text>
      </View>
      <Text style={{ textAlign: "center", fontSize: 16 }}>
        Total flex children: 1+2+3 = 6
      </Text>
    </View>
  );
};
