// app/Menu.js
import * as Haptics from "expo-haptics";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import NavbarForBagels from "./components/NavbarForBagels"; // ✅ Shared Navbar

/* ---------- Small component for category chips with glow + haptics ---------- */
function CategoryChip({ label, source, active, onPress, width = 180 }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = async () => {
    try {
      await Haptics.selectionAsync();
    } catch {}
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={pressIn}
      onPressOut={pressOut}
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.chipWrap, { width }]}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <ImageBackground
          source={source}
          style={[styles.chipBg, active && styles.chipBgActive]}
          imageStyle={styles.chipBgImage}
        >
          <View style={styles.chipOverlay} />
          <Text style={styles.chipText}>{label}</Text>
        </ImageBackground>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function Menu() {
  const { width } = useWindowDimensions();
  const isWide = Platform.OS === "web" && width >= 900;

  const [activeCategory, setActiveCategory] = useState("Breakfast");

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);

  // ✅ Menu Data
  const menuData = {
    Breakfast: {
      sections: [
        {
          title: "Bagels & Schmears",
          type: "table",
          items: [
            { name: "Avocado", price: "$1.50" },
            { name: "Bagel or Toast with Avocado", price: "$4.55" },
            { name: "Bagel with Butter", price: "$2.80" },
            { name: "Breakfast Meat", price: "$2.25" },
            { name: "Jelly", price: "$0.50" },
            { name: "Side Flavored Cream Cheese", price: "$2.95" },
            { name: "Side Plain Cream Cheese", price: "$2.25" },
            { name: "Veggies", price: "$1.00" },
            { name: "Bagel with Cream Cheese", price: "$3.75" },
            { name: "Bagel with Flavored Cream Cheese", price: "$4.65" },
            { name: "Bagel with Cream Cheese & Bacon", price: "$5.50" },
            { name: "Bagel with Flavored CC & Bacon", price: "$6.75" },
            { name: "Bagel with Flavored CC, Bacon & Fresh Avocado", price: "$7.99" },
            { name: "Bagel with Peanut Butter & Jelly", price: "$4.50" },
            { name: "Bagel with Nova & Cream Cheese", price: "$12.00" },
            { name: "Bagel with Nova & *Flavored* Cream Cheese", price: "$12.50" },
            { name: "Bagel with Whitefish", price: "$8.75" },
            { name: "Bagel with Smoked Salmon Spread", price: "$7.75" },
          ],
          notes: ["Romaine Lettuce, Onion, Cream Cheese & Capers available."],
        },
        {
          title: "Signature Omelettes",
          type: "table",
          items: [
            { name: "*Ham, Sausage, Bacon or Pork Roll & Cheese Omelette", price: "$11.99" },
            { name: "Asparagus, Onion, Swiss Cheese Omelette", price: "$10.60" },
            { name: "Broccoli & Cheese Omelette", price: "$9.95" },
            { name: "Cheese Omelette", price: "$9.95" },
            { name: "Fresh Nova, Tomato, Onion, Capers, Chive CC Omelette", price: "$13.99" },
            { name: "Fried Avocado, Grilled Tomato, Mozzarella Omelette", price: "$13.75" },
            { name: "Philly Steak Omelette", price: "$14.00", note: "Cherry Peppers & Fried Onions" },
            { name: "Spanish Omelette", price: "$10.75", note: "Peppers, Onions, Salsa & Cheddar" },
            { name: "Spinach & Feta Omelette", price: "$11.15" },
            {
              name: "Veggie Delight Omelette",
              price: "$12.99",
              note: "Spinach, Broccoli, Peppers, Onions, Mushrooms, Egg Whites & Cheese",
            },
            { name: "Western Omelette", price: "$11.75", note: "*Ham, Peppers, Onions & Cheese" },
            { name: "Zucchini, Onion, Cheese Omelette", price: "$10.60" },
          ],
        },
        {
          title: "Build Your Own Breakfast",
          type: "info",
          bullets: [
            "Meats – Bacon, Porkroll, Sausage, *Ham, Scrapple, Turkey Bacon, Turkey Sausage & Steak",
            "Cheese – American, Swiss, Provolone, Mozzarella, Pepperjack, Cheddar & Feta",
            "Veggies – Spinach, Broccoli, Avocado, Peppers, Onions, Mushrooms & Tomato",
            "Breads – Bagel, Croissant, Burrito, English",
            "Breakfast Burritos – Made with three eggs",
            "Burrito Flavors – Plain, Honey Wheat, Spinach & Herb, Tomato Basil",
          ],
        },
        {
          title: "Breakfast Platters",
          type: "table",
          items: [
            { name: "#1 2 Eggs", price: "$8.99", note: "Side of Potatoes, Toast or Bagel" },
            { name: "#2 2 Eggs", price: "$10.99", note: "Potatoes, Breakfast Meat, Toast or Bagel" },
            { name: "#3 French Toast (3)", price: "$12.98", note: "Side of Breakfast Meat" },
            { name: "#4 Pancakes (3)", price: "$12.99", note: "Side of Breakfast Meat" },
            { name: "#5 2 Eggs", price: "$12.99", note: "Potatoes + 1 French Toast or 1 Pancake" },
            { name: "#6 2 Eggs", price: "$13.65", note: "Potatoes + Breakfast Meat + 1 FT or 1 Pancake" },
          ],
        },
      ],
    },

    Lunch: [
      { name: "Turkey Club Sandwich", price: "$9.99" },
      { name: "Grilled Chicken Wrap", price: "$8.50" },
      { name: "Steak & Cheese Bagel Melt", price: "$10.75" },
    ],
    Desserts: [
      { name: "Chocolate Croissant", price: "$3.50" },
      { name: "Cheesecake Slice", price: "$4.75" },
      { name: "Cinnamon Roll", price: "$3.99" },
    ],
    Drinks: [
      { name: "Fresh Orange Juice", price: "$3.25" },
      { name: "Iced Coffee", price: "$2.99" },
      { name: "Hot Latte", price: "$3.50" },
    ],
    Trending: [
      { name: "Everything Bagel Sandwich", price: "$7.50" },
      { name: "Blueberry Cream Cheese Bagel", price: "$5.25" },
      { name: "Cold Brew Latte", price: "$4.75" },
    ],
  };

  const categoryImages = {
    Breakfast: require("../assets/images/bagel_images/breakfast.jpg"),
    Lunch: require("../assets/images/bagel_images/lunch.jpg"),
    Desserts: require("../assets/images/bagel_images/deserts.jpg"),
    Drinks: require("../assets/images/bagel_images/drinks.png"),
    Trending: require("../assets/images/bagel_images/trending.jpg"),
  };

  // ✅ Animate list on category change
  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 20, duration: 200, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]),
    ]).start();
  }, [activeCategory]);

  // Helpers
  const TableCard = ({ title, rows, notes, widthStyle }) => (
    <View style={[styles.tableWrap, widthStyle]}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderTitle}>{title}</Text>
        <View style={styles.tableHeaderCols}>
          <Text style={styles.colHeadLeft}>Item</Text>
          <Text style={styles.colHeadRight}>Price</Text>
        </View>
      </View>
      <View style={styles.tableBody}>
        {rows.map((it, idx) => {
          const isLast = idx === rows.length - 1;
          return (
            <View key={`${it.name}-${idx}`} style={[styles.row, isLast && styles.rowLast]}>
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={styles.itemName}>{it.name}</Text>
                {!!it.note && <Text style={styles.itemNote}>({it.note})</Text>}
              </View>
              <Text style={styles.itemPrice}>{it.price}</Text>
            </View>
          );
        })}
      </View>
      {!!notes?.length && (
        <View style={styles.notesBox}>
          {notes.map((n, i) => (
            <Text key={i} style={styles.noteText}>
              • {n}
            </Text>
          ))}
        </View>
      )}
    </View>
  );

  const InfoCard = ({ title, bullets }) => (
    <View style={styles.infoWrap}>
      <Text style={styles.infoTitle}>{title}</Text>
      {bullets.map((b, i) => (
        <Text key={i} style={styles.infoBullet}>
          • {b}
        </Text>
      ))}
    </View>
  );

  const splitInTwo = (arr) => {
    const mid = Math.ceil(arr.length / 2);
    return [arr.slice(0, mid), arr.slice(mid)];
  };

  return (
    <View style={styles.root}>
      {/* 🔵 Background */}
      <View style={styles.bgWrap}>
        <Image
          source={require("../assets/images/bagel_images/bagelbg.png")}
          style={styles.bgImg}
          blurRadius={Platform.OS === "web" ? 0 : 8}
        />
        <View style={styles.bgTint} />
      </View>

      {/* ✅ Navbar */}
      <NavbarForBagels />

      {/* ✅ Chips */}
      {isWide ? (
        <View style={styles.chipsGrid}>
          {Object.keys(menuData).map((cat) => (
            <CategoryChip
              key={cat}
              label={cat}
              source={categoryImages[cat]}
              active={activeCategory === cat}
              onPress={() => setActiveCategory(cat)}
              width={180}
            />
          ))}
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll} contentContainerStyle={styles.chipsRow}>
          {Object.keys(menuData).map((cat) => (
            <CategoryChip
              key={cat}
              label={cat}
              source={categoryImages[cat]}
              active={activeCategory === cat}
              onPress={() => setActiveCategory(cat)}
              width={150}
            />
          ))}
        </ScrollView>
      )}

      {/* ✅ Content */}
      <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <ScrollView ref={scrollRef} contentContainerStyle={styles.scroll}>
          {activeCategory === "Breakfast" ? (
            <>
              <View style={[styles.grid, isWide && styles.gridWide]}>
                <TableCard
                  title={menuData.Breakfast.sections[0].title}
                  rows={menuData.Breakfast.sections[0].items}
                  notes={menuData.Breakfast.sections[0].notes}
                  widthStyle={isWide ? styles.half : styles.full}
                />
                <TableCard
                  title={menuData.Breakfast.sections[1].title}
                  rows={menuData.Breakfast.sections[1].items}
                  widthStyle={isWide ? styles.half : styles.full}
                />
              </View>

              <InfoCard title={menuData.Breakfast.sections[2].title} bullets={menuData.Breakfast.sections[2].bullets} />

              <View style={[styles.grid, isWide && styles.gridWide]}>
                <TableCard
                  title={menuData.Breakfast.sections[3].title}
                  rows={menuData.Breakfast.sections[3].items}
                  widthStyle={isWide ? styles.half : styles.full}
                />
              </View>
            </>
          ) : (
            (() => {
              const [left, right] = splitInTwo(menuData[activeCategory]);
              return (
                <View style={[styles.grid, isWide && styles.gridWide]}>
                  <TableCard title={`${activeCategory} (1)`} rows={left} widthStyle={isWide ? styles.half : styles.full} />
                  {right.length > 0 && (
                    <TableCard title={`${activeCategory} (2)`} rows={right} widthStyle={isWide ? styles.half : styles.full} />
                  )}
                </View>
              );
            })()
          )}

          {/* Back to top */}
          <TouchableOpacity onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })} style={styles.backToTop}>
            <Text style={styles.backToTopText}>↑ Back to top</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

/* ====================== STYLES ====================== */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "transparent" },

  bgWrap: { ...StyleSheet.absoluteFillObject, zIndex: -2, overflow: "hidden" },
  bgImg: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    transform: [{ scale: Platform.OS === "web" ? 1.03 : 1 }],
    ...(Platform.OS === "web" ? { filter: "blur(3px)" } : {}),
  },
  bgTint: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.25)" },

  chipsGrid: {
    width: "100%",
    maxWidth: 1100,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
  },
  chipsScroll: { width: "100%", maxHeight: 120 },
  chipsRow: { paddingHorizontal: 12, paddingVertical: 12, gap: 12, alignItems: "center" },
  chipWrap: { borderRadius: 10, overflow: "hidden", alignSelf: "center" },
  chipBg: {
    width: "100%",
    height: 90,
    justifyContent: "flex-end",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    ...(Platform.OS === "web" ? { boxShadow: "0 3px 12px rgba(0,0,0,0.2)" } : {}),
  },
  chipBgActive: {
    borderColor: "#fff",
    shadowColor: "#ffffff",
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    ...(Platform.OS === "web" ? { boxShadow: "0 0 16px rgba(255,255,255,0.65)" } : {}),
  },
  chipBgImage: { resizeMode: "cover" },
  chipOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
  chipText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  scroll: { padding: 20, alignItems: "center", gap: 16 },

  grid: { width: "100%", maxWidth: 1100 },
  gridWide: { flexDirection: "row", flexWrap: "wrap", gap: 16, justifyContent: "space-between" },
  half: { width: "calc(50% - 8px)" },
  full: { width: "100%" },

  tableWrap: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  tableHeader: {
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  tableHeaderTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  tableHeaderCols: { flexDirection: "row", justifyContent: "space-between" },
  colHeadLeft: { color: "#aaa", fontSize: 13 },
  colHeadRight: { color: "#aaa", fontSize: 13 },

  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  rowLast: { borderBottomWidth: 0 },
  itemName: { color: "#000", fontSize: 16, fontWeight: "600", flexShrink: 1, paddingRight: 12 },
  itemNote: { color: "#444", fontSize: 12, marginTop: 4 },
  itemPrice: { color: "#111", fontSize: 15, fontWeight: "600", minWidth: 72, textAlign: "right" },

  notesBox: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#f7f7f7", borderTopWidth: 1, borderTopColor: "#e5e5e5" },
  noteText: { color: "#333", fontSize: 13, lineHeight: 18 },

  infoWrap: {
    width: "100%",
    maxWidth: 1100,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
    overflow: "hidden",
    padding: 16,
    gap: 8,
  },
  infoTitle: { color: "#000", fontSize: 18, fontWeight: "700", textAlign: "center", marginBottom: 4 },
  infoBullet: { color: "#222", fontSize: 14, lineHeight: 20 },

  backToTop: {
    marginTop: 12,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#111",
    borderRadius: 8,
  },
  backToTopText: { color: "#fff", fontWeight: "700" },
});
