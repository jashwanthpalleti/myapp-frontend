import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// -------------------------------
// API CONFIGURATION
// -------------------------------
// ⚡ Change this IP when your PC Wi-Fi IP changes (check with ipconfig/ifconfig)
const LAN_IP = "10.1.10.197";   
const PORT = "8000";
const API_URL = `http://${LAN_IP}:${PORT}/api/contact/`;
// -------------------------------

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    const payload = {
      name: name.trim(),
      email: email.trim(),
      category: category.trim(),
      message: message.trim(),
    };

    // 🚨 Validation checks (client-side)
    if (!payload.name || !payload.email || !payload.category || !payload.message) {
      setErrorMsg("⚠️ Please fill all fields");
      return;
    }
    if (!validateEmail(payload.email)) {
      setErrorMsg("⚠️ Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      console.log("🌐 Sending request to:", API_URL); // ✅ Debugging log

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        // ✅ Success
        setName("");
        setEmail("");
        setCategory("");
        setMessage("");
        setSubmitted(true);
      } else {
        // ❌ Handle backend errors properly
        let errorMessage = "";
        try {
          const errorJson = await res.json();
          console.log("❌ Server error JSON:", errorJson);

          if (typeof errorJson === "object") {
            errorMessage = Object.entries(errorJson)
              .map(([field, msgs]) =>
                Array.isArray(msgs)
                  ? `${field}: ${msgs.join(", ")}`
                  : `${field}: ${msgs}`
              )
              .join("\n");
          } else {
            errorMessage = JSON.stringify(errorJson);
          }
        } catch {
          const errorText = await res.text();
          console.log("❌ Server error text:", errorText);
          errorMessage = errorText || "Unknown error";
        }
        setErrorMsg(`❌ ${errorMessage}`);
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      setErrorMsg(
        "❌ Could not reach the server.\n" +
          "Check if:\n- Backend is running\n- IP is correct (" +
          LAN_IP +
          ")\n- Phone & PC are on same Wi-Fi"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {submitted ? (
        <>
          <Text style={styles.thankYou}>
            ✅ We have received your information. We'll contact you soon!
          </Text>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setSubmitted(false)}
          >
            <Text style={styles.secondaryButtonText}>
              Submit Another Response
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Contact Us</Text>
          {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#666"
          />

          <TextInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#666"
          />

          <TextInput
            placeholder="Business Category (e.g. Restaurant, Smoke Shop)"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
            placeholderTextColor="#666"
          />

          <TextInput
            placeholder="Your Message"
            value={message}
            onChangeText={setMessage}
            style={[styles.input, { height: 100 }]}
            multiline
            placeholderTextColor="#666"
          />

          <TouchableOpacity
            style={[styles.button, loading && { backgroundColor: "#93c5fd" }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Submitting..." : "Submit"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#1d4ed8",
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontSize: 18, textAlign: "center", fontWeight: "bold" },

  secondaryButton: {
    marginTop: 20,
    backgroundColor: "#facc15",
    paddingVertical: 14,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },

  thankYou: {
    fontSize: 20,
    textAlign: "center",
    color: "#16a34a",
    fontWeight: "600",
    marginBottom: 15,
  },
  error: { fontSize: 14, color: "red", marginBottom: 10, textAlign: "center" },
});
