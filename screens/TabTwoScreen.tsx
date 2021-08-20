import * as React from "react";
import { StyleSheet } from "react-native";
import {Card} from "../components/Card";
import { View } from "../components/Themed";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
     <Card age={29} name="Herr Röd" backgroundColor="red"/>
     <Card age={31} name="Fru Blå" backgroundColor="blue"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
