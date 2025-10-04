// app/_layout.tsx
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Navbar from "./components/Navbar";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      {/* ✅ Global Navbar always visible */}
      <Navbar scrollRefs={undefined}/>

      {/* ✅ Stack renders page content below Navbar */}
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
