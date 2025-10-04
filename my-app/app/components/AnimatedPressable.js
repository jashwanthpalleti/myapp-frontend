// components/AnimatedPressable.js
import { useRef } from "react";
import { Animated, Platform, Pressable } from "react-native";

export default function AnimatedPressable({ children, onPress, style }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={({ hovered }) => [
          hovered && Platform.OS === "web"
            ? { transform: [{ scale: 1.05 }], opacity: 0.9 }
            : null,
        ]}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
