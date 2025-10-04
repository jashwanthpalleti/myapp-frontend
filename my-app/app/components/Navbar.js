import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Navbar({ scrollRefs }) {
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current; // dropdown height
  const fadeAnim = useRef(new Animated.Value(0)).current; // dropdown opacity
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const router = useRouter();

  const handleScrollTo = (section) => {
    if (scrollRefs?.[section]?.current) {
      scrollRefs[section].current.scrollTo({ y: 0, animated: true });
    } else {
      router.push("/"); // fallback
    }
    setIsOpen(false);
  };

  // 🔥 Animate menu open/close
  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  const dropdownHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 220], // adjust menu height
  });

  // ✅ Animated button wrapper for tap/hover effect
  const AnimatedPressable = ({ children, onPress }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
          style={({ hovered }) => [
            hovered && Platform.OS === "web" ? styles.linkHover : null,
          ]}
        >
          {children}
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.navbar}>
        {/* Logo */}
        <TouchableOpacity
          style={styles.logoContainer}
          onPress={() => handleScrollTo("home")}
        >
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Desktop Navigation */}
        {isDesktop ? (
          <View style={styles.desktopLinks}>
            <AnimatedPressable onPress={() => handleScrollTo("home")}>
              <Text style={styles.navText}>Home</Text>
            </AnimatedPressable>
            <AnimatedPressable onPress={() => router.push("/OurWorks")}>
              <Text style={styles.navText}>Our Works</Text>
            </AnimatedPressable>
            <AnimatedPressable onPress={() => router.push("/about")}>
              <Text style={styles.navText}>About Us</Text>
            </AnimatedPressable>
            <AnimatedPressable onPress={() => router.push("/ContactForm")}>
              <View style={styles.ctaBtn}>
                <Text style={styles.ctaText}>Get a Website</Text>
              </View>
            </AnimatedPressable>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Mobile Dropdown Menu (Animated with Slide + Fade) */}
      {!isDesktop && (
        <Animated.View style={[styles.mobileMenu, { height: dropdownHeight }]}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <AnimatedPressable
              onPress={() => {
                handleScrollTo("home");
                setIsOpen(false);
              }}
            >
              <Text style={styles.mobileText}>Home</Text>
            </AnimatedPressable>

            <AnimatedPressable
              onPress={() => {
                router.push("/OurWorks");
                setIsOpen(false);
              }}
            >
              <Text style={styles.mobileText}>Our Works</Text>
            </AnimatedPressable>

            <AnimatedPressable
              onPress={() => {
                router.push("/about");
                setIsOpen(false);
              }}
            >
              <Text style={styles.mobileText}>About Us</Text>
            </AnimatedPressable>

            <AnimatedPressable
              onPress={() => {
                router.push("/ContactForm");
                setIsOpen(false);
              }}
            >
              <View style={[styles.ctaBtn, { alignSelf: "flex-start" }]}>
                <Text style={styles.ctaText}>Get a Website</Text>
              </View>
            </AnimatedPressable>
          </Animated.View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#3a8dc1",
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#3a8dc1",
    zIndex: 10000,
    ...Platform.select({
      android: { elevation: 8 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      web: { position: "sticky", top: 0 },
    }),
  },
  logoContainer: { justifyContent: "center", alignItems: "flex-start" },
  logo: {
    height: Platform.OS === "web" ? 55 : 40,
    width: Platform.OS === "web" ? 160 : 120,
  },
  menuIcon: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  desktopLinks: { flexDirection: "row", alignItems: "center" },
  navText: {
    fontSize: 16,
    color: "#fff",
    marginHorizontal: 14,
    transition: "color 0.3s ease",
  },
  linkHover: {
    opacity: 0.8,
    transform: [{ scale: 1.05 }],
  },
  ctaBtn: {
    marginLeft: 16,
    backgroundColor: "yellow",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  ctaText: { fontSize: 15, fontWeight: "bold", color: "#000" },
  mobileMenu: {
    overflow: "hidden",
    backgroundColor: "#1e3a8a",
    paddingHorizontal: 18,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  mobileText: {
    fontSize: 16,
    color: "#fff",
    paddingVertical: 10,
  },
});
