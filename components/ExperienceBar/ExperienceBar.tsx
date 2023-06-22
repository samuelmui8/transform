import { View, Text, Animated, Keyboard } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { DocumentReference, arrayUnion, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setInitalAmount } from "../../redux/expSlice";

type props = {
  height: number;
};

export const ExperienceBar: React.FC<props> = ({ height }) => {
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  const [width, setWidth] = useState(0);
  const { value } = useAppSelector((store) => store.exp);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * (value % 100)) / 100);
  }, [value, width]);

  return (
    <>
      <Text>LEVEL: {Math.floor(value / 100)}</Text>
      <Text>{value} EXP</Text>
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
      <Text>⚡{100 - (value % 100)} MORE EXP TO THE NEXT LEVEL⚡</Text>
    </>
  );
};
