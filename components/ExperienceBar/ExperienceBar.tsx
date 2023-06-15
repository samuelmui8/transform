import { View, Text, Animated, Keyboard } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  DocumentReference,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";

type props = {
  height: number;
};

export const ExperienceBar: React.FC<props> = ({ height }) => {
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  const [width, setWidth] = useState(0);
  const [exp, setExp] = useState(0);

  let user = auth.currentUser;
  let userDocRef: DocumentReference;

  if (user) {
    // get tasklist for user from firestore
    userDocRef = doc(db, "users", user.uid);
    getDoc(userDocRef).then((snap) => {
      if (snap.exists()) {
        setExp(snap.data().exp);
      } else {
        // snap.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * (exp % 100)) / 100);
  }, [exp, width]);

  return (
    <>
      <Text>LEVEL: {Math.floor(exp / 100)}</Text>
      <Text>{exp} EXP</Text>
      <View
        onLayout={(e) => {
          const newWidth = e.nativeEvent.layout.width;

          setWidth(newWidth);
        }}
        style={{
          height,
          backgroundColor: "white",
          borderRadius: height,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            height,
            width: "100%",
            borderRadius: height,
            backgroundColor: "red",
            position: "absolute",
            left: 0,
            top: 0,
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          }}
        />
      </View>
      <Text>⚡{100 - (exp % 100)} MORE EXP TO THE NEXT LEVEL⚡</Text>
    </>
  );
};
