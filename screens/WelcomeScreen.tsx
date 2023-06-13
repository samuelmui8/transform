import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { NavigationProp } from "@react-navigation/native";

type props = {
  navigation: NavigationProp<Record<string, any>>;
};

export const WelcomeScreen: React.FC<props> = ({ navigation }) => {
  let name;
  const user = auth.currentUser;
  if (user) {
    name = user.displayName;
  }
 
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Signed out.");
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Home Page
        </Text>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <Text>Welcome, {name} </Text>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: "#6699CC",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 16,
              color: "#fff",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
