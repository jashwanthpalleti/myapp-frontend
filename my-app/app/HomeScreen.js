// app/HomeScreen.js
import { useRef } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ImageComparison from "./components/ImageComparison";
import Navbar from "./components/Navbar";

export default function HomeScreen({ navigation }) {
  const scrollRefs = {
    home: useRef(),
    works: useRef(),
  };

  return (
    <View style={styles.root}>
      <Navbar navigation={navigation} scrollRefs={scrollRefs} />

      <ScrollView style={styles.container}>
        <View ref={scrollRefs.home} style={styles.section}>
          {/* Attractive heading with hover effect */}
          <Pressable
            style={({ hovered }) => [
              styles.headingWrapper,
              hovered && styles.headingHover,
            ]}
          >
            <Text style={styles.heading}>
              Something beyond your business for your business
            </Text>
          </Pressable>

          <ImageComparison />
        </View>

        <View ref={scrollRefs.works} style={[styles.section, styles.portfolio]}>
          <Text style={styles.title}>Our Works</Text>
          <Text style={styles.paragraph}>
            Showcase of my projects will go here.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1 },
  section: { padding: 20, alignItems: "center" },
  headingWrapper: {
    padding: 8,
    borderRadius: 8,
    transition: "all 0.3s ease-in-out", // ✅ web smooth animation
  },
  heading: {
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 20,
    color: "#1d4ed8", // blue accent
    letterSpacing: 1,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headingHover: {
    transform: [{ scale: 1.05 }],
    backgroundColor: "#e0f2fe", // light blue background
  },
  portfolio: { backgroundColor: "#ebf8ff" },
  title: { fontSize: 24, fontWeight: "600", color: "#1d4ed8" },
  paragraph: {
    marginTop: 10,
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
  },
});
