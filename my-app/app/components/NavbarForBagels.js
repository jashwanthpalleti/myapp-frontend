// app/components/NavbarForBagels.js
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NavbarForBagels() {
  const router = useRouter();

  return (
    <BlurView
      intensity={70} // glass effect
      tint="dark"
      style={styles.navbar}
    >
      {/* Logo */}
      <Text style={styles.logo}>🥯 Bagel Bliss</Text>

      {/* Links */}
      <View style={styles.navLinks}>
        <TouchableOpacity onPress={() => router.push("/BagelStore")}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/Menu")}>
          <Text style={styles.navText}>Menu</Text>
        </TouchableOpacity>

        {/* Specials → Menu with Trending */}
        <TouchableOpacity
          onPress={() =>
            router.push({ pathname: "/Menu", params: { category: "Trending" } })
          }
        >
          <Text style={styles.navText}>Specials</Text>
        </TouchableOpacity>

        {/* About & Contact → same destination */}
        <TouchableOpacity onPress={() => router.push("/about")}>
          <Text style={styles.navText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/about")}>
          <Text style={styles.navText}>Contact</Text>
        </TouchableOpacity>

        {/* Order Now → disabled (no navigation) */}
        <TouchableOpacity style={styles.orderBtn} onPress={() => {}}>
          <Text style={styles.orderText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: Platform.OS === "web" ? 0 : 1,
    borderBottomColor: "rgba(255,255,255,0.2)",
    ...(Platform.OS === "web"
      ? {
          backgroundColor: "rgba(0,0,0,0.6)", // fallback for web
          backdropFilter: "blur(12px)",       // glass effect on web
        }
      : {}),
  },
  logo: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  navLinks: { flexDirection: "row", alignItems: "center" },
  navText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 20,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  orderBtn: {
    marginLeft: 30,
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  orderText: { color: "#000", fontWeight: "bold" },
});
