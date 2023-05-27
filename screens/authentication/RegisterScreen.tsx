import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { NavigationProp } from "@react-navigation/native";

type props = {
  navigation: NavigationProp<Record<string, any>>;
};

export const RegisterScreen: React.FC<props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        navigation.navigate("Home");
      })
      .catch((error) => alert(error.message));
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        updateProfile(user, { displayName: name })
          .then(handleLogin)
          .catch((error) => alert(error.message));
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Sign Up Page
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
          <TextInput
            placeholder="Name"
            onChangeText={(text) => setName(text)}
            style={{
              flex: 1,
              paddingVertical: 0,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            style={{
              flex: 1,
              paddingVertical: 0,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          onPress={handleSignUp}
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
            Register
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <Text>Alerady registered?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "#6699CC", fontWeight: "700" }}> Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
