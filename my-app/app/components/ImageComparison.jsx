import Slider from "@react-native-community/slider";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ImageComparisonSlider() {
  const [sliderValue, setSliderValue] = useState(0.5);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const imageWidth = screenWidth * 0.9 || 1;
  const imageHeight = Platform.select({
    web: 450,
    default: 280,
  });

  return (
    <View style={styles.container}>
      {/* Before Image */}
      <Pressable style={styles.imageWrapper}>
        <Image
          source={require("../../assets/house-before.png")}
          style={[styles.image, { width: imageWidth, height: imageHeight }]}
        />
        <Text style={styles.overlayText}>Struggling to reach customers</Text>
      </Pressable>

      {/* After Image Overlay */}
      <View
        style={[
          styles.overlay,
          { width: imageWidth * sliderValue, height: imageHeight },
        ]}
      >
        <Pressable style={styles.imageWrapper}>
          <Image
            source={require("../../assets/house-after.png")}
            style={[styles.image, { width: imageWidth, height: imageHeight }]}
          />
          <Text style={[styles.overlayText, { color: "#000000ff" }]}>
            Thriving with online presence
          </Text>
        </Pressable>
      </View>

      {/* Labels */}
      <View style={[styles.labels, { width: imageWidth }]}>
        <Text style={styles.labelText}>← Before Website</Text>
        <Text style={styles.labelText}>After Website →</Text>
      </View>

      {/* Slider */}
      <Slider
        style={[styles.slider, { width: imageWidth }]}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        onValueChange={setSliderValue}
        minimumTrackTintColor="#1d4ed8"
        maximumTrackTintColor="#d1d5db"
        thumbTintColor="#1d4ed8"
      />

      {/* Call to Action */}
      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaText}>🚀 Get Your Website Today</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  imageWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    resizeMode: "cover",
    minHeight: 200,
  },
  overlay: {
    position: "absolute",
    left: 0,
    overflow: "hidden",
    borderRadius: 12,
  },
  overlayText: {
    position: "absolute",
    bottom: 15,
    left: 15,
    fontWeight: "bold",
    fontSize: 16,
    color: "#1d4ed8",
    backgroundColor: "rgba(255,255,255,0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  labelText: {
    fontWeight: "bold",
    color: "#333",
  },
  slider: {
    height: 40,
  },
  ctaButton: {
    marginTop: 15,
    backgroundColor: "#1d4ed8",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  ctaText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
