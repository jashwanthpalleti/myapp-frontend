import { useRouter } from "expo-router";
import { useRef } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AnimatedPressable from "./components/AnimatedPressable";
import ImageComparisonSlider from "./components/ImageComparison";

// ✅ Icons
import { Entypo, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter();
  const scrollRefs = {
    home: useRef(),
    works: useRef(),
    about: useRef(),
  };

  return (
    <ImageBackground
      source={require("../assets/backgroundd.png")}
      style={styles.root}
      resizeMode="cover"
    >
      {/* Dark overlay for readability */}
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 🌟 Hero Section */}
        <View ref={scrollRefs.home} style={[styles.section, styles.heroSection]}>
          <Text style={styles.heroHeading}>
            Something beyond your business for your business
          </Text>

          <Text style={styles.subHeading}>
            We craft modern websites & digital solutions to grow your business.
          </Text>

          <AnimatedPressable onPress={() => router.push("/ContactForm")}>
            <View style={styles.ctaButton}>
              <Text style={styles.ctaText}>Get Started</Text>
            </View>
          </AnimatedPressable>

          <ImageComparisonSlider />
        </View>

        {/* 💡 Why Choose Us */}
        <View style={[styles.section, styles.card]}>
          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
          <View style={styles.grid}>
            <View style={styles.cardItem}>
              <Ionicons name="flash-outline" size={32} color="#1d4ed8" />
              <Text style={styles.cardTitle}>Fast Delivery</Text>
              <Text style={styles.cardText}>
                We build and launch projects on time, so your business never waits.
              </Text>
            </View>
            <View style={styles.cardItem}>
              <MaterialIcons name="attach-money" size={32} color="#16a34a" />
              <Text style={styles.cardTitle}>Affordable Pricing</Text>
              <Text style={styles.cardText}>
                Professional services at startup-friendly prices — no hidden costs.
              </Text>
            </View>
            <View style={styles.cardItem}>
              <FontAwesome5 name="paint-brush" size={28} color="#f59e0b" />
              <Text style={styles.cardTitle}>Modern Designs</Text>
              <Text style={styles.cardText}>
                Sleek, user-friendly websites tailored to your brand identity.
              </Text>
            </View>
            <View style={styles.cardItem}>
              <Ionicons name="handshake-outline" size={32} color="#3b82f6" />
              <Text style={styles.cardTitle}>Ongoing Support</Text>
              <Text style={styles.cardText}>
                We stay with you after launch to ensure your success.
              </Text>
            </View>
          </View>
        </View>

        {/* 🛠 Our Works Preview */}
        <View style={[styles.section, styles.card]}>
          <Text style={styles.sectionTitle}>Our Works</Text>
          <View style={styles.grid}>
            <View style={styles.cardItem}>
              <Ionicons name="globe-outline" size={32} color="#1d4ed8" />
              <Text style={styles.cardTitle}>Websites</Text>
              <Text style={styles.cardText}>
                From landing pages to e-commerce, we create stunning websites that convert visitors into customers.
              </Text>
            </View>
            <View style={styles.cardItem}>
              <Entypo name="brush" size={28} color="#f97316" />
              <Text style={styles.cardTitle}>Branding</Text>
              <Text style={styles.cardText}>
                Logos, brand kits, and design systems that make you stand out in the crowd.
              </Text>
            </View>

            {/* 🎉 Bagel Store CTA */}
            <View style={styles.cardItem}>
              <Ionicons name="cafe-outline" size={32} color="#000" />
              <Text style={styles.cardTitle}>Bagel Store Website</Text>
              <Text style={styles.cardText}>
                A sleek dark & gold styled website designed for a local bagel shop.
              </Text>
              <AnimatedPressable onPress={() => router.push("/BagelStore")}>
                <View style={styles.ctaButton}>
                  <Text style={styles.ctaText}>View Project</Text>
                </View>
              </AnimatedPressable>
            </View>
          </View>
        </View>

        {/* ⭐ Testimonials */}
        <View style={[styles.section, styles.card]}>
          <Text style={styles.sectionTitle}>What Our Clients Say</Text>
          <View style={styles.testimonial}>
            <Text style={styles.quote}>
              "Jash Techno built us a beautiful website in record time. Our
              sales grew 150% after launch!"
            </Text>
            <Text style={styles.author}>— Happy Client</Text>
          </View>
          <View style={styles.testimonial}>
            <Text style={styles.quote}>
              "Affordable and professional. They treated my small business like
              it was a big brand."
            </Text>
            <Text style={styles.author}>— Startup Owner</Text>
          </View>
        </View>

        {/* 🚀 Call To Action */}
        <View style={[styles.section, styles.ctaSection]}>
          <Text style={styles.ctaBigText}>
            Let’s build your website today 🚀
          </Text>
          <AnimatedPressable onPress={() => router.push("/ContactForm")}>
            <View style={styles.ctaButtonDark}>
              <Text style={styles.ctaTextDark}>Contact Us</Text>
            </View>
          </AnimatedPressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, width: "100%", height: "100%" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.4)" },
  scrollContent: { flexGrow: 1, padding: 20 },
  section: {
    padding: 30,
    marginVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  heroSection: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 40,
    marginTop: 40,
  },
  heroHeading: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 15,
    color: "#fff",
    letterSpacing: 1.2,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 5,
  },
  subHeading: {
    fontSize: 18,
    textAlign: "center",
    color: "#e0f2fe",
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: "#facc15",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  ctaText: { fontSize: 16, fontWeight: "bold", color: "#000" },
  card: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1d4ed8",
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardItem: {
    width: "48%",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8, textAlign: "center" },
  cardText: { fontSize: 14, textAlign: "center", color: "#555" },
  testimonial: { marginBottom: 20, alignItems: "center" },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    color: "#374151",
    marginBottom: 8,
  },
  author: { fontSize: 14, fontWeight: "600", color: "#1d4ed8" },
  ctaSection: {
    backgroundColor: "#1d4ed8",
    padding: 40,
    borderRadius: 12,
    marginBottom: 40,
    alignItems: "center",
  },
  ctaBigText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  ctaButtonDark: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  ctaTextDark: { fontSize: 18, fontWeight: "bold", color: "#1d4ed8" },
});
