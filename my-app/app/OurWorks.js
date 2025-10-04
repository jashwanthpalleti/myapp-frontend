import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AnimatedPressable from "./components/AnimatedPressable"; // ✅ reusable animation wrapper

export default function OurWorks() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Our Works</Text>
      <Text style={styles.subheading}>
        Explore some of the projects we’ve proudly designed and built.
      </Text>

      {/* ✅ Stacked Rectangle Projects */}
      <View style={styles.list}>
        {/* Bagel Store Project */}
        <AnimatedPressable onPress={() => router.push("/BagelStore")}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🥯 Bagel Store</Text>
            <Text style={styles.cardText}>
              A modern black & white themed website design for a Bagel shop.
            </Text>
          </View>
        </AnimatedPressable>

        {/* Coffee Shop */}
        <AnimatedPressable>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>☕ Coffee Shop</Text>
            <Text style={styles.cardText}>
              (Coming soon) Stylish online presence for a cozy café.
            </Text>
          </View>
        </AnimatedPressable>

        {/* Portfolio */}
        <AnimatedPressable>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🎨 Portfolio</Text>
            <Text style={styles.cardText}>
              (Coming soon) A sleek portfolio for showcasing creative work.
            </Text>
          </View>
        </AnimatedPressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff", // white background
  },
  heading: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 30,
  },
  list: {
    flexDirection: "column",
    gap: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 20,
  },
});
