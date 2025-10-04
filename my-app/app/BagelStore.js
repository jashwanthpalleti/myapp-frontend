import { useRouter } from "expo-router";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AnimatedPressable from "./components/AnimatedPressable"; // ✅ reusable animation wrapper
import NavbarForBagels from "./components/NavbarForBagels";

export default function BagelStore() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      {/* ✅ Dark Blue Background */}
      <View style={styles.bgTint} />

      {/* Navbar */}
      <NavbarForBagels />

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* 🥯 Hero with Two Images */}
        <View style={styles.heroRow}>
          <ImageBackground
            source={require("../assets/images/bagel_images/allbagels.jpg")}
            style={styles.heroHalf}
            imageStyle={styles.heroImage}
          >
            <View style={styles.heroOverlay} />
            <Text style={styles.heroTitle}>Freshly Baked</Text>
          </ImageBackground>

          <ImageBackground
            source={require("../assets/images/bagel_images/allbagels2.jpg")}
            style={styles.heroHalf}
            imageStyle={styles.heroImage}
          >
            <View style={styles.heroOverlay} />
            <Text style={styles.heroTitle}>Every Morning</Text>
          </ImageBackground>
        </View>

        {/* CTA */}
        <AnimatedPressable onPress={() => router.push("/Menu")}>
          <View style={styles.ctaBtn}>
            <Text style={styles.ctaText}>See Menu</Text>
          </View>
        </AnimatedPressable>

        {/* About Section */}
        <View style={[styles.section, styles.aboutCard]}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.sectionText}>
            At Bagel Bliss, we’ve been baking happiness since 1998. From sesame
            to gourmet cream cheese bagels, everything is made with fresh
            ingredients and a touch of love.
          </Text>
        </View>

        {/* Customer Reviews */}
        <View style={[styles.section, styles.reviewSection]}>
          <Text style={styles.sectionTitle}>⭐ Customer Reviews</Text>
          <View style={styles.reviewCard}>
            <Text style={styles.reviewText}>
              "Best bagels in town! Crispy outside, soft inside."
            </Text>
            <Text style={styles.reviewAuthor}>— Sarah L.</Text>
          </View>
          <View style={styles.reviewCard}>
            <Text style={styles.reviewText}>
              "Their cream cheese flavors are unbeatable!"
            </Text>
            <Text style={styles.reviewAuthor}>— Mike R.</Text>
          </View>
          <View style={styles.reviewCard}>
            <Text style={styles.reviewText}>
              "I stop by every morning on my way to work. Love this place."
            </Text>
            <Text style={styles.reviewAuthor}>— Jasmine K.</Text>
          </View>
        </View>

        {/* Location Section */}
        <View style={[styles.section, styles.locationSection]}>
          <Text style={styles.sectionTitle}>📍 Our Location</Text>
          <Text style={styles.sectionText}>123 Bagel Street, Foodtown, NY</Text>
          <Text style={styles.sectionText}>Mon–Sat: 7 AM – 6 PM</Text>
          <Text style={styles.sectionText}>Sunday: Closed</Text>
          <Image
            source={require("../assets/images/bagel_images/bagelbg.png")}
            style={styles.mapImage}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} Bagel Bliss. All rights reserved.
          </Text>
          <Text style={styles.footerSub}>Designed by Jash Techno</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0f172a" }, // dark navy

  bgTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0f172a",
    zIndex: -2,
  },

  scroll: { padding: 20 },

  /* Hero */
  heroRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  heroHalf: {
    flex: 1,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  heroImage: { resizeMode: "cover" },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  /* CTA */
  ctaBtn: {
    backgroundColor: "#facc15",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  ctaText: { fontSize: 18, fontWeight: "bold", color: "#000" },

  /* Sections */
  section: {
    padding: 30,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#facc15", // yellow accent
    marginBottom: 12,
    textAlign: "center",
  },
  sectionText: {
    color: "#e5e7eb", // light gray
    fontSize: 16,
    textAlign: "center",
    marginBottom: 6,
    lineHeight: 22,
  },

  /* About Section */
  aboutCard: { backgroundColor: "rgba(6, 90, 225, 0.15)" },

  /* Reviews */
  reviewSection: { backgroundColor: "rgba(25, 215, 95, 0.1)" },
  reviewCard: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#1e293b",
  },
  reviewText: {
    fontSize: 16,
    color: "#f3f4f6",
    fontStyle: "italic",
    marginBottom: 6,
    textAlign: "center",
  },
  reviewAuthor: {
    color: "#facc15",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  /* Location */
  locationSection: {
    backgroundColor: "rgba(250,204,21,0.08)",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: 180,
    marginTop: 15,
    borderRadius: 8,
    resizeMode: "cover",
  },

  /* Footer */
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#334155",
    alignItems: "center",
  },
  footerText: { color: "#94a3b8", fontSize: 14 },
  footerSub: { color: "#64748b", fontSize: 12, marginTop: 4 },
});
