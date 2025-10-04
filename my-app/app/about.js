import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRef } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AboutScreen() {
  const scrollRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToContact = () => {
    if (contactRef.current && scrollRef.current) {
      contactRef.current.measureLayout(
        scrollRef.current.getInnerViewNode(),
        (x, y) => {
          scrollRef.current.scrollTo({ y, animated: true });
        }
      );
    }
  };

  return (
    <ScrollView ref={scrollRef} style={styles.root} contentContainerStyle={styles.scrollContent}>
      {/* 🌟 Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroText}>About Us</Text>
        <Text style={styles.subHeading}>
          Building digital solutions for small businesses with passion and purpose.
        </Text>
      </View>

      {/* 🎯 Mission Section */}
      <View style={[styles.section, styles.card]}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.paragraph}>
          At <Text style={styles.highlight}>Jash Techno</Text>, we believe every small
          business deserves a strong digital presence. Our mission is to deliver
          modern, affordable, and scalable solutions — from websites to branding — 
          that empower entrepreneurs to grow online.
        </Text>
      </View>

      {/* 💡 Core Values */}
      <View style={[styles.section, styles.card]}>
        <Text style={styles.sectionTitle}>Our Values</Text>
        <View style={styles.grid}>
          <View style={styles.valueCard}>
            <Ionicons name="handshake-outline" size={28} color="#3b82f6" style={styles.icon} />
            <Text style={styles.valueTitle}>Trust</Text>
            <Text style={styles.valueText}>We build lasting relationships with transparency and reliability.</Text>
          </View>
          <View style={styles.valueCard}>
            <Ionicons name="rocket-outline" size={28} color="#16a34a" style={styles.icon} />
            <Text style={styles.valueTitle}>Innovation</Text>
            <Text style={styles.valueText}>We use the latest technology to craft future-ready solutions.</Text>
          </View>
          <View style={styles.valueCard}>
            <FontAwesome5 name="paint-brush" size={24} color="#f59e0b" style={styles.icon} />
            <Text style={styles.valueTitle}>Creativity</Text>
            <Text style={styles.valueText}>Our designs are modern, unique, and crafted to tell your story.</Text>
          </View>
          <View style={styles.valueCard}>
            <MaterialIcons name="show-chart" size={28} color="#dc2626" style={styles.icon} />
            <Text style={styles.valueTitle}>Growth</Text>
            <Text style={styles.valueText}>We focus on solutions that help businesses scale sustainably.</Text>
          </View>
        </View>
      </View>

      {/* 👤 Founder Section */}
      <View style={[styles.section, styles.card]}>
        <Text style={styles.sectionTitle}>Meet the Founder</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.highlight}>Jashwanth Palleti</Text>, CEO of Jash Techno, is
          passionate about empowering small businesses through technology. With
          expertise in web development, digital marketing, and AI, he ensures every
          client receives solutions that blend creativity with performance.
        </Text>
      </View>

      {/* 📞 Contact Section */}
      <View ref={contactRef} style={[styles.section, styles.card, styles.contactSection]}>
        <Text style={styles.sectionTitle}>Get in Touch</Text>
        <View style={styles.contactCard}>
          <Ionicons name="person-circle-outline" size={26} color="#1d4ed8" />
          <Text style={styles.contactText}>Jashwanth Palleti</Text>
        </View>
        <View style={styles.contactCard}>
          <MaterialIcons name="email" size={24} color="#dc2626" />
          <Text style={styles.contactText}>jash@jashtechno.com</Text>
        </View>
        <View style={styles.contactCard}>
          <FontAwesome5 name="whatsapp" size={24} color="#16a34a" />
          <Text style={styles.contactText}>+91 8562000159 (WhatsApp)</Text>
        </View>
      </View>

      {/* 🚀 Call To Action */}
      <View style={[styles.section, styles.ctaSection]}>
        <Text style={styles.ctaBigText}>Ready to grow your business with us?</Text>
        <TouchableOpacity style={styles.ctaButton} onPress={scrollToContact}>
          <Text style={styles.ctaText}>Contact Us 🚀</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f9fafb" },
  scrollContent: { padding: 20, paddingBottom: 40 },

  // Hero
  hero: { alignItems: "center", marginBottom: 30 },
  heroText: {
    fontSize: 32,
    fontWeight: "900",
    color: "#1d4ed8",
    marginBottom: 10,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    maxWidth: 350,
  },

  // Sections
  section: { marginBottom: 25, padding: 20, borderRadius: 12 },
  card: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1d4ed8",
    marginBottom: 15,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#374151",
    textAlign: "center",
  },
  highlight: { fontWeight: "700", color: "#1d4ed8" },

  // Values Grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  valueCard: {
    width: "48%",
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  icon: { marginBottom: 8 },
  valueTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  valueText: { fontSize: 14, textAlign: "center", color: "#555" },

  // Contact Section
  contactSection: { backgroundColor: "#fef9c3" }, // soft yellow highlight
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  contactText: { fontSize: 16, color: "#374151" },

  // CTA
  ctaSection: {
    backgroundColor: "#1d4ed8",
    alignItems: "center",
    padding: 30,
    borderRadius: 12,
  },
  ctaBigText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  ctaButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  ctaText: { fontSize: 16, fontWeight: "bold", color: "#1d4ed8" },
});
