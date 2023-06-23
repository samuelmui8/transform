import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../FirebaseConfig";
import { NavigationProp } from "@react-navigation/native";
import { ExperienceBar } from "../components/ExperienceBar/ExperienceBar";
import { DocumentReference, doc, getDoc } from "firebase/firestore";
import { initWorkout, initMinutes, initCalories } from "../redux/fitnessSlice";
import { useAppDispatch } from "../redux/hooks";
import { setInitalAmount } from "../redux/expSlice";

type props = {
  navigation: NavigationProp<Record<string, any>>;
};

export const WelcomeScreen: React.FC<props> = ({ navigation }) => {
  let name;
  const user = auth.currentUser;
  let userDocRef: DocumentReference;
  const dispatch = useAppDispatch();
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

  if (user) {
    // get tasklist for user from firestore
    userDocRef = doc(db, "users", user.uid);
    getDoc(userDocRef).then((snap) => {
      if (snap.exists()) {
        dispatch(initWorkout(snap.data().workout));
        dispatch(initCalories(snap.data().calories));
        dispatch(initMinutes(snap.data().minutes));
        dispatch(setInitalAmount(snap.data().exp));
      } else {
        console.log("No such document!");
      }
    });
  }

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
        <View
          style={{
            paddingBottom: 10,
          }}
        >
          <ExperienceBar height={10} />
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
